// pages/api/forgot-password.js

import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();

  try {
    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Error adding lab test" },
        { status: 400 }
      );
    } // Generate a reset password token (you can use a package like `crypto-random-string` for this)

    const resetPasswordToken = generateResetPasswordToken(); // Set the token and its expiry in the user document

    user.forgotPasswordToken = resetPasswordToken;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000); // Token expiry in 1 hour

    await user.save(); // Send a reset password email to the user
    const transporter = nodemailer.createTransport({
      // configure your email provider here
      service: "gmail",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: "oxignpathlab@gmail.com",
        pass: "ckvpyvzprcmjdfhw",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: "oxignpathlab@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetPasswordToken}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Lab test added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Internal server error" });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  //   return res.status(405).json({ error: "Method not allowed"
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

function generateResetPasswordToken() {
  // Generate a random token with a length of 32 characters
  const token = cryptoRandomString({ length: 32, type: "url-safe" });

  return token;
}
