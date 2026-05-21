import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { connectToDatabase, getDb } from './db.js'
import { sendOTPEmail } from './emailService.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('HealthSync Backend Running')
})

// Authentication Middleware
const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const secretKey = process.env.SECRET_KEY || 'supersecretkey_change_in_production';
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.sub;

    if (!email) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const db = getDb();
    const user = await db.collection('users').findOne({ email: email.trim().toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Request is not authorized' });
  }
};

// Route: Sign Up (Create Account)
// First Name, Last Name, Email, Password, Confirm Password checked on frontend
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'First name, last name, email and password are required' });
  }

  const trimmedEmail = email.trim().toLowerCase();
  
  try {
    const db = getDb();
    const existingUser = await db.collection('users').findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'Account already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    
    const newUser = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      full_name: fullName,
      email: trimmedEmail,
      hashed_password: hashedPassword,
      is_active: true,
      role: 'patient',
      created_at: new Date(),
      dob: '',
      gender: 'Male',
      blood_group: '',
      height: '',
      weight: ''
    };

    const result = await db.collection('users').insertOne(newUser);
    
    const secretKey = process.env.SECRET_KEY || 'supersecretkey_change_in_production';
    const token = jwt.sign(
      { sub: trimmedEmail },
      secretKey,
      { algorithm: 'HS256', expiresIn: '30m' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      isFirstTime: true,
      user: {
        email: trimmedEmail,
        full_name: fullName,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        role: newUser.role,
        is_active: newUser.is_active
      }
    });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Send OTP (Sign In - Existing Users Only)
app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const db = getDb();
    
    // Check if user already exists
    const user = await db.collection('users').findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ error: 'Account does not exist. Please create an account first.' });
    }

    // Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

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

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in send-otp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Verify OTP (Sign In)
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const inputOtp = otp.trim();

  try {
    const db = getDb();
    
    const otpRecord = await db.collection('otps').findOne({ email: normalizedEmail });

    if (!otpRecord) {
      return res.status(400).json({ error: 'No OTP requested for this email' });
    }

    if (otpRecord.otp !== inputOtp) {
      return res.status(400).json({ error: 'Invalid OTP code' });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // OTP is valid. Delete it so it cannot be reused
    await db.collection('otps').deleteOne({ email: normalizedEmail });

    // Fetch user details
    const user = await db.collection('users').findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ error: 'User account not found' });
    }

    // Generate JWT access token
    const secretKey = process.env.SECRET_KEY || 'supersecretkey_change_in_production';
    const token = jwt.sign(
      { sub: normalizedEmail },
      secretKey,
      { algorithm: 'HS256', expiresIn: '30m' }
    );

    res.status(200).json({
      message: 'OTP verified successfully',
      token,
      isFirstTime: false,
      user: {
        email: user.email,
        full_name: user.full_name,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        is_active: user.is_active
      }
    });

  } catch (error) {
    console.error('Error in verify-otp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Get Profile Details
app.get('/api/user/profile', requireAuth, async (req, res) => {
  try {
    res.status(200).json({
      email: req.user.email,
      full_name: req.user.full_name,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      dob: req.user.dob || '',
      gender: req.user.gender || 'Male',
      blood_group: req.user.blood_group || '',
      height: req.user.height || '',
      weight: req.user.weight || ''
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Update Profile Details
app.put('/api/user/profile', requireAuth, async (req, res) => {
  const { dob, gender, bloodGroup, height, weight } = req.body;
  try {
    const db = getDb();
    
    const updateFields = {};
    if (dob !== undefined) updateFields.dob = dob;
    if (gender !== undefined) updateFields.gender = gender;
    if (bloodGroup !== undefined) updateFields.blood_group = bloodGroup;
    if (height !== undefined) updateFields.height = height;
    if (weight !== undefined) updateFields.weight = weight;

    await db.collection('users').updateOne(
      { _id: req.user._id },
      { $set: updateFields }
    );

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Get all reports uploaded by the user for himself
app.get('/api/reports', requireAuth, async (req, res) => {
  try {
    const db = getDb();
    const userReports = await db.collection('reports')
      .find({ user_id: req.user._id.toString() })
      .sort({ uploaded_at: -1 })
      .toArray();

    res.status(200).json(userReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Add a report for user
app.post('/api/reports', requireAuth, async (req, res) => {
  const { document_type, source, file_name } = req.body;
  if (!document_type || !source) {
    return res.status(400).json({ error: 'Document type and source are required' });
  }

  try {
    const db = getDb();
    const newReport = {
      user_id: req.user._id.toString(),
      document_type,
      source,
      file_name: file_name || 'report.pdf',
      uploaded_at: new Date()
    };

    const result = await db.collection('reports').insertOne(newReport);
    res.status(201).json({ ...newReport, _id: result.insertedId });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Get Family Members
app.get('/api/family-members', requireAuth, async (req, res) => {
  try {
    const db = getDb();
    const members = await db.collection('family_members')
      .find({ user_id: req.user._id.toString() })
      .toArray();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching family members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Add Family Member
app.post('/api/family-members', requireAuth, async (req, res) => {
  const { first_name, last_name, date_of_birth, relationship, gender, blood_group } = req.body;
  if (!first_name || !last_name || !date_of_birth || !relationship || !gender) {
    return res.status(400).json({ error: 'First name, last name, DOB, relationship, and gender are required' });
  }

  try {
    const db = getDb();
    const newMember = {
      user_id: req.user._id.toString(),
      first_name,
      last_name,
      full_name: `${first_name.trim()} ${last_name.trim()}`,
      date_of_birth,
      relationship,
      gender,
      blood_group: blood_group || '',
      created_at: new Date()
    };

    const result = await db.collection('family_members').insertOne(newMember);
    res.status(201).json({ ...newMember, _id: result.insertedId });
  } catch (error) {
    console.error('Error adding family member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Get Reports for a specific Family Member
app.get('/api/family-reports/:family_member_id', requireAuth, async (req, res) => {
  const { family_member_id } = req.params;
  try {
    const db = getDb();
    const reports = await db.collection('family_reports')
      .find({ family_member_id: family_member_id.toString() })
      .sort({ uploaded_at: -1 })
      .toArray();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching family reports:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Add a report for a Family Member
app.post('/api/family-reports', requireAuth, async (req, res) => {
  const { family_member_id, document_type, source, file_name } = req.body;
  if (!family_member_id || !document_type || !source) {
    return res.status(400).json({ error: 'Family member ID, document type, and source are required' });
  }

  try {
    const db = getDb();
    const newReport = {
      family_member_id: family_member_id.toString(),
      document_type,
      source,
      file_name: file_name || 'family_report.pdf',
      uploaded_at: new Date()
    };

    const result = await db.collection('family_reports').insertOne(newReport);
    res.status(201).json({ ...newReport, _id: result.insertedId });
  } catch (error) {
    console.error('Error saving family report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Get Metrics for User
app.get('/api/metrics', requireAuth, async (req, res) => {
  try {
    const db = getDb();
    const userMetrics = await db.collection('metrics')
      .find({ user_id: req.user._id.toString() })
      .sort({ recorded_at: -1 })
      .toArray();
    res.status(200).json(userMetrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Add a Metric for User
app.post('/api/metrics', requireAuth, async (req, res) => {
  const { category, sub_metric, value, context, notes } = req.body;
  if (!category || !sub_metric || value === undefined) {
    return res.status(400).json({ error: 'Category, sub-metric name, and value are required' });
  }

  try {
    const db = getDb();
    const newMetric = {
      user_id: req.user._id.toString(),
      category,
      sub_metric,
      value: Number(value),
      context: context || 'General',
      notes: notes || '',
      recorded_at: new Date()
    };

    const result = await db.collection('metrics').insertOne(newMetric);
    res.status(201).json({ ...newMetric, _id: result.insertedId });
  } catch (error) {
    console.error('Error saving metric:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;

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