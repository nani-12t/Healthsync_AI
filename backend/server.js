import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { connectToDatabase, getDb } from './db.js'
import { sendOTPEmail } from './emailService.js'
import { sendOTPWhatsApp } from './whatsappService.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HealthSync Backend Running')
})

// Route to generate and send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  const { email, phone } = req.body;
  if ((!email || !email.trim()) && (!phone || !phone.trim())) {
    return res.status(400).json({ error: 'Email or Phone is required' });
  }

  try {
    const db = getDb();
    
    // Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();

      // Store OTP in database, updating existing record if any
      await db.collection('otps').updateOne(
        { email: normalizedEmail },
        { $set: { otp, expiresAt } },
        { upsert: true }
      );

      // Send the email (handled asynchronously to not block response)
      sendOTPEmail(normalizedEmail, otp).catch(err => {
        console.error(`Error sending email to ${normalizedEmail}:`, err);
      });
    } else {
      // Normalize phone number
      const normalizedPhone = phone.replace(/\D/g, '');
      const finalPhone = normalizedPhone.length === 10 ? '91' + normalizedPhone : normalizedPhone;

      // Store OTP in database under the phone number
      await db.collection('otps').updateOne(
        { phone: finalPhone },
        { $set: { otp, expiresAt } },
        { upsert: true }
      );

      // Send WhatsApp message (handled asynchronously)
      sendOTPWhatsApp(phone, otp).catch(err => {
        console.error(`Error sending WhatsApp to ${phone}:`, err);
      });
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in send-otp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to verify OTP and return access token
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, phone, otp, name } = req.body;
  
  if ((!email && !phone) || !otp) {
    return res.status(400).json({ error: 'Email/Phone and OTP are required' });
  }

  const inputOtp = otp.trim();

  try {
    const db = getDb();
    let otpRecord;
    let normalizedEmail = null;
    let finalPhone = null;

    if (email) {
      normalizedEmail = email.trim().toLowerCase();
      otpRecord = await db.collection('otps').findOne({ email: normalizedEmail });
    } else {
      const normalizedPhone = phone.replace(/\D/g, '');
      finalPhone = normalizedPhone.length === 10 ? '91' + normalizedPhone : normalizedPhone;
      otpRecord = await db.collection('otps').findOne({ phone: finalPhone });
    }

    if (!otpRecord) {
      return res.status(400).json({ error: `No OTP requested for this ${email ? 'email' : 'phone number'}` });
    }

    if (otpRecord.otp !== inputOtp) {
      return res.status(400).json({ error: 'Invalid OTP code' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // OTP is valid. Delete it so it cannot be reused
    if (email) {
      await db.collection('otps').deleteOne({ email: normalizedEmail });
    } else {
      await db.collection('otps').deleteOne({ phone: finalPhone });
    }

    // Check if the user already exists in the "users" collection
    let user;
    if (email) {
      user = await db.collection('users').findOne({ email: normalizedEmail });
    } else {
      user = await db.collection('users').findOne({ phone: finalPhone });
    }

    let isFirstTime = false;

    if (!user) {
      isFirstTime = true;
      
      // Generate a random password fallback for compatibility
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newUser = {
        hashed_password: hashedPassword,
        full_name: name ? name.trim() : null,
        is_active: true,
        role: 'patient',
        created_at: new Date(),
        allowed_access_list: []
      };

      if (email) {
        newUser.email = normalizedEmail;
      } else {
        newUser.phone = finalPhone;
      }

      const result = await db.collection('users').insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
      console.log(`[AUTH] Registered new user: ${email ? normalizedEmail : finalPhone}`);
    } else {
      console.log(`[AUTH] Logged in existing user: ${email ? normalizedEmail : finalPhone}`);
    }

    // Generate JWT access token (matching python_api/core/security.py details)
    const secretKey = process.env.SECRET_KEY || 'supersecretkey_change_in_production';
    const token = jwt.sign(
      { sub: email ? normalizedEmail : finalPhone },
      secretKey,
      { algorithm: 'HS256', expiresIn: '30m' } // HS256 matches FastAPI settings
    );

    res.status(200).json({
      message: 'OTP verified successfully',
      token,
      isFirstTime,
      user: {
        email: user.email || null,
        phone: user.phone || null,
        full_name: user.full_name,
        role: user.role,
        is_active: user.is_active
      }
    });

  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server due to database connection error:', err);
    process.exit(1);
  });