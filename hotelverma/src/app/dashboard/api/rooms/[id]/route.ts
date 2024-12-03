import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../signup/utils/db';
import Hotel from '../../../models/Hotels';
import { getSession } from '../../../utils/auth';

// Check if the session user is an admin
const checkAdmin = (session: any) => {
  return session?.user?.role === 'admin';
};

// Update Hotel API Route (correct method handling for PUT)
export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id'); // Correct way to get query parameters
  const { title, location, amenities, image, price, rating, booked } = await req.json(); // Get the request body
  
  if (!id) {
    return NextResponse.json({ message: 'Hotel ID is required.' }, { status: 400 });
  }

  // Connect to the database
  await connectToDatabase();

  try {
    // Get the session to verify the admin
    const session = await getSession(req);

    if (!session || !checkAdmin(session)) {
      return NextResponse.json({ message: 'Unauthorized. Admins only.' }, { status: 403 });
    }

    // Find the hotel and update it
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { title, location, amenities, image, price, rating, booked },
      { new: true } // Return the updated hotel
    );

    if (!hotel) {
      return NextResponse.json({ message: 'Hotel not found.' }, { status: 404 });
    }

    // Return the updated hotel data
    return NextResponse.json({ hotel }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
