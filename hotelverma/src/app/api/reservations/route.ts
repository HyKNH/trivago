import { NextResponse } from 'next/server';
import { getSession } from '../../lib/auth';
import Reservation from '../../lib/models/Reservations';
import Hotel from '../../lib/models/Hotels'; 
import { connectToDatabase } from '../../lib/db';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await getSession(req);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const reservations = await Reservation.find({ userId: session.user._id });

    const formattedReservations = [];

    for (const reservation of reservations) {
      const hotel = await Hotel.findById(reservation.hotelId, 'title location price roomType');
      
      formattedReservations.push({
        _id: reservation._id,
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        telephone: reservation.telephone,
        hotelName: hotel?.title || 'Unknown Hotel',
        location: hotel?.location || 'Unknown Location',
        checkInDate: reservation.checkInDate, 
        checkOutDate: reservation.checkOutDate,
        price: hotel?.price || 0,
        confirmationNumber: reservation.confirmationNumber,
        roomType: hotel?.roomType || 'Unknown Room Type'

      });
    }

    return NextResponse.json({ reservations: formattedReservations });
  } catch (error) {
    console.error('Error in GET /reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
