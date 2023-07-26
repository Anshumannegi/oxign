// pages/api/addAppointment.js

import { connect } from "@/dbConfig/dbConfig";
import LabTestAppointment from "../../../../models/appointment";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { patientName, date, testType, doctorName, labName } = reqBody;

    // You can add any necessary validations here before proceeding with the appointment creation.

    const appointment = new LabTestAppointment({
      patientName,
      date,
      testType,
      doctorName,
      labName,
    });

    await appointment.save();

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
