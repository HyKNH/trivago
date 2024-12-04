import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../signup/utils/db';
import Hotel from './../../models/Hotels';
import { getSession } from '../../utils/auth';

const checkAdmin = (session: any) => {
  return session?.user?.role === 'admin';
};

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

export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req);

    if (!checkAdmin(session)) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const body = await req.json(); 
    const { title, location, amenities, image, price, rating, roomType } = body;

    if (!title || !location || !price || !rating) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const newHotel = new Hotel({
      title,
      location,
      amenities: amenities?.split(',').map((a: string) => a.trim()),
      image,
      price,
      rating,
      roomType
    });

    const savedHotel = await newHotel.save();
    return NextResponse.json({ hotel: savedHotel }, { status: 201 });
  } catch (error) {
    console.error('Error adding hotel:', error);
    return NextResponse.json({ message: 'Error adding hotel' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession(req);

    if (!checkAdmin(session)) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const { hotelId } = await req.json();
    if (!hotelId) {
      return NextResponse.json({ message: 'Hotel ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      return NextResponse.json({ message: 'Hotel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return NextResponse.json({ message: 'Error deleting hotel' }, { status: 500 });
  }
}