import Reservation from "../../reservation/models/Reservations";
import { connectToDatabase } from "@/app/reservation/utils/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const confirmationNumber = url.searchParams.get("confirmationNumber"); // Extract the confirmation number from the query string

  if (!confirmationNumber) {
    return new Response(
      JSON.stringify({ error: "Confirmation number is required" }),
      {
        status: 400,
      }
    );
  }

  try {
    await connectToDatabase();

    // Query the reservation using the confirmation number
    const reservation = await Reservation.findOne({ confirmationNumber });

    if (!reservation) {
      return new Response(
        JSON.stringify({ error: "Reservation not found" }),
        {
          status: 404,
        }
      );
    }

    // Return the reservation details
    return new Response(JSON.stringify({ reservation }), { status: 200 });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
