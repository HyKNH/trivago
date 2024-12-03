import Reservation from "../model/Reservation";
import { connectToDatabase } from "../utils/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const confirmationNumber = url.searchParams.get("confirmationNumber");

  if (!confirmationNumber) {
    return new Response(
      JSON.stringify({ error: "Confirmation number is required" }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const reservation = await Reservation.findOne({ confirmationNumber })
      .populate('userId', 'name email')
      .populate('hotelId', 'title location')
      .exec(); // Corrected method

    if (!reservation) {
      return new Response(
        JSON.stringify({ error: "Reservation not found" }),
        { status: 404 }
      );
    }

    // Format reservation details
    const formattedReservation = {
      _id: reservation._id,
      userName: reservation.userId?.name || 'Unknown Name',
      userEmail: reservation.userId?.email || 'Unknown Email',
      userTelephone: reservation.telephone || 'Unknown Telephone',
      hotelId: reservation.hotelId?._id || null,
      hotelName: reservation.hotelId?.title || 'Unknown Hotel',
      location: reservation.hotelId?.location || 'Unknown Location',
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      confirmationNumber: reservation.confirmationNumber,
    };

    // Return the reservation details
    return new Response(
      JSON.stringify({ reservation: formattedReservation }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
