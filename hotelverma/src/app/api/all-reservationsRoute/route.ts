import { NextResponse } from 'next/server';
import { getSession } from '../../lib/auth';
import Reservation from '../../lib/models/Reservations';
import { connectToDatabase } from '../../lib/db';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await getSession(req);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied. Admins only.' }, { status: 403 });
    }

    const reservations = await Reservation.find({})
      .populate('userId', 'name email')
      .populate('hotelId', 'title location price roomType')
      .exec();

    const formattedReservations = reservations.map((reservation) => ({
      _id: reservation._id,
      userName: reservation.userId?.name || 'Unknown Name',
      userEmail: reservation.userId?.email || 'Unknown Email',
      userTelephone: reservation.telephone || 'Unknown Telephone',
      hotelId: reservation.hotelId?._id || null,
      hotelName: reservation.hotelId?.title || 'Unknown Hotel',
      location: reservation.hotelId?.location || 'Unknown Location',
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      price: reservation.hotelId?.price || 0,
      confirmationNumber: reservation.confirmationNumber,
      roomType: reservation.hotelId?.roomType || 'Uknown Room Type'
    }));

    return NextResponse.json({ reservations: formattedReservations });
  } catch (error) {
    console.error('Error in GET /all-reservations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
