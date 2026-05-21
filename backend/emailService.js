import nodemailer from 'nodemailer';

/**
 * Sends an OTP email to the user.
 * Falls back to ethereal.email or console logging if SMTP is not configured.
 * @param {string} email - Destination email address
 * @param {string} otp - The 6-digit OTP code
 */
export async function sendOTPEmail(email, otp) {
  const lowercaseEmail = email.toLowerCase();
  
  // 1. Check if SMTP credentials exist in environment variables
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"HealthSync AI" <${process.env.SMTP_USER}>`,
        to: lowercaseEmail,
        subject: 'Your HealthSync AI OTP Verification Code',
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #0d1b3e; text-align: center;">HealthSync AI</h2>
            <hr style="border: 0; border-top: 1px solid #eeeeee;" />
            <p>Hello,</p>
            <p>Thank you for logging in to HealthSync AI. Please use the following One-Time Password (OTP) to verify your account:</p>
            <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 30px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; color: #00c4b4; letter-spacing: 5px;">
              ${otp}
            </div>
            <p>This code is valid for 5 minutes. If you did not request this code, please ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #eeeeee;" />
            <p style="font-size: 12px; color: #888888; text-align: center;">HealthSync AI - Smarter Care with AI</p>
          </div>
        `,
      });
      console.log(`[SMTP] Real email successfully sent to ${lowercaseEmail}`);
      return;
    } catch (smtpError) {
      console.error(`[SMTP] Error sending via configured SMTP:`, smtpError);
      console.log(`[SMTP] Retrying via fallback...`);
    }
  }

  // 2. Fallback to ethereal email for testing
  try {
    console.log(`[SMTP] Creating dynamic Ethereal Test Account...`);
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"HealthSync AI Test" <noreply@healthsync.ai>',
      to: lowercaseEmail,
      subject: 'Your HealthSync AI OTP Verification Code',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #0d1b3e; text-align: center;">HealthSync AI [TEST]</h2>
          <hr style="border: 0; border-top: 1px solid #eeeeee;" />
          <p>Hello,</p>
          <p>Thank you for logging in to HealthSync AI. Please use the following One-Time Password (OTP) to verify your account:</p>
          <div style="font-size: 24px; font-weight: bold; text-align: center; margin: 30px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; color: #3b82f6; letter-spacing: 5px;">
            ${otp}
          </div>
          <p>This code is valid for 5 minutes. If you did not request this code, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee;" />
          <p style="font-size: 12px; color: #888888; text-align: center;">HealthSync AI - Smarter Care with AI</p>
        </div>
      `,
    });

    console.log(`[SMTP] Ethereal message sent: ${info.messageId}`);
    console.log(`[SMTP] Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log(`[OTP BYPASS] OTP for ${lowercaseEmail} is: ${otp}`);
  } catch (err) {
    console.error(`[SMTP] Ethereal test account failed. Fallback to console log. Error:`, err);
    console.log(`[OTP BYPASS] OTP for ${lowercaseEmail} is: ${otp}`);
  }
}
