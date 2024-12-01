import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../utils/db';
import Hotel from '../models/Hotels';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const hotels = await Hotel.find();
    return NextResponse.json({ hotels });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json({ message: 'Error fetching hotels' }, { status: 500 });
  }
}
