import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/db';
import Hotel from '../../lib/models/Hotels';

export const dynamic = 'force-dynamic';

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
