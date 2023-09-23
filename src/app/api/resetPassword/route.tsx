// pages/api/reset-password.js

import User from "@/models/userModel";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const { resetToken, newPassword } = await req.json();

    try {
      // Find the user by the reset token and check if it's still valid
      const user = await User.findOne({
        forgotPasswordToken: resetToken,
        forgotPasswordTokenExpiry: { $gt: Date.now() }, // Token should not be expired
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 404 }
        );
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password and clear the reset token fields
      user.password = hashedPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

      await user.save();

      return NextResponse.json({
        message: "Password reset successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
