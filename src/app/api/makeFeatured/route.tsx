// pages/api/updateLabTest.js

import { connect } from "@/dbConfig/dbConfig";
import LabTest from "../../../models/tests";
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function PUT(request: NextRequest) {
  if (request.method !== 'PUT') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { id, isFeatured } = await request.json();

  try {
    const labTest = await LabTest.findById(id);

    if (!labTest) {
      return NextResponse.json({ message: 'Lab test not found' }, { status: 404 });
    }

    labTest.isFeatured = isFeatured;
    await labTest.save();

    return NextResponse.json({ message: 'Lab test updated successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
