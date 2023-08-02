import { connect } from "@/dbConfig/dbConfig";
import LabTestAppointment from "../../../../models/appointment";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

connect();

// eslint-disable-next-line import/no-anonymous-default-export
export const PUT= async (_request: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    // Find the LabTestAppointment by ID
    const labTestAppointment = await LabTestAppointment.findById(id);

    // Check if the appointment exists
    if (!labTestAppointment) {
      return new NextResponse("Appointment not found", { status: 404 });
    }

    // Mark the appointment as completed
    labTestAppointment.isCompleted = true;
    await labTestAppointment.save();

    return new NextResponse("Appointment has been marked as completed", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
