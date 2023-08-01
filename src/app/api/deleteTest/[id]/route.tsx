// pages/api/deleteLabTest.js

import { connect } from "@/dbConfig/dbConfig";
import LabTest from "../../../../models/tests";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

connect();

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;

  try {
    await connect();

    await LabTest.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
