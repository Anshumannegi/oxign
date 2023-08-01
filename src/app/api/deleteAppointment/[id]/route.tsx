// pages/api/deleteLabTest.js

import { connect } from "@/dbConfig/dbConfig";
import appointment from "../../../../models/appointment";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

connect();

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    await appointment.findByIdAndDelete(id);

    return new NextResponse("Appointment has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
