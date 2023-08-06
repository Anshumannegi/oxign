import { connect } from "@/dbConfig/dbConfig";
import LabTestAppointment from "../../../../models/appointment";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

connect();

// Function to send the email
async function sendAppointmentConfirmationEmail(patientName: any,testName:any) {
  const email = "rishabhjha0@gmail.com";
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
    subject: "Appointment Confirmation",
    text: `Dear ${patientName},\n\nYour appointment for ${testName} has been successfully booked. Thank you for choosing us.\n\nBest regards,\nThe Appointment Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Appointment confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      patientId,
      patientName,
      date,
      testDestination,
      phoneNumber,
      address,
      testName,
      testPrice,
    } = reqBody;

    // You can add any necessary validations here before proceeding with the appointment creation.

    const appointment = new LabTestAppointment({
      patientId,
      testName,
      testDestination,
      phoneNumber,
      address,
      testPrice,
      patientName,
      date,
    });

    await appointment.save();

    // Send the appointment confirmation email
    await sendAppointmentConfirmationEmail(patientName, testName);

    return NextResponse.json({
      message: "Appointment added successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error adding appointment" },
      { status: 400 }
    );
  }
}
