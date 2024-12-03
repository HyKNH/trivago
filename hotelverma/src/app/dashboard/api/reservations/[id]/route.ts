import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../signup/utils/db';
import { getSession } from '../../../utils/auth';
import Reservation from '../../../models/Reservations';
import Hotel from '../../../models/Hotels';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const session = await getSession(req);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { id } = params;

    const reservation = await Reservation.findOne({
      _id: id,
      userId: session.user._id,
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    const hotel = await Hotel.findById(reservation.hotelId);
    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    hotel.booked = false;
    await hotel.save();

    await Reservation.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Reservation deleted successfully and hotel status updated' });
  } catch (error) {
    console.error('Error in DELETE /reservations/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
