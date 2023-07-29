// pages/api/getAllAppointments.js
export const revalidate = 0;
import { connect } from "@/dbConfig/dbConfig";
import LabTestAppointment from "../../../models/appointment";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const appointments = await LabTestAppointment.find();
    return NextResponse.json(appointments);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching appointments" },
      { status: 500 }
    );
  }
}
