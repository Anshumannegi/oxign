import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // You can use any library for generating a unique token
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";

connect();
async function sendMail(verifyToken: any, email: any) {
  const verificationLink = `https://www.oxign.co.in//verify/${verifyToken}`;
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
    subject: "Account Verification",
    html: `Click <a href="${verificationLink}">here</a> to verify your account.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
  }
}
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate a verification token
    const verifyToken = uuidv4();

    // Set the token expiry (e.g., 1 day from now)
    const verifyTokenExpiry = new Date();
    verifyTokenExpiry.setDate(verifyTokenExpiry.getDate() + 1);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry,
    });
    // Send verification email
    await sendMail(verifyToken, email);

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully. Verification email sent.",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
