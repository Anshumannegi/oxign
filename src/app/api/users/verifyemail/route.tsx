
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "../../../../helpers/mailer";

// pages/api/verify.js


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, verificationToken } = req.body;

  try {
    // Call the sendVerificationEmail function to send the email
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (emailSent) {
      return res.status(200).json({ message: 'Verification email sent successfully!' });
    } else {
      return res.status(500).json({ error: 'Failed to send verification email.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error sending verification email.' });
  }
}
