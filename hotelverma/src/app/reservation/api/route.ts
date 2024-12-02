import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/app/reservation/models/Reservation";
import { connectToDatabase } from "@/app/reservation/utils/db";
import Hotel from "../../hotels/models/Hotels";
import { getSession } from "@/app/dashboard/utils/auth";

// The GET function is now accepting an `id` as a parameter
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id"); // Extract the hotel ID from the query string

  if (!id) {
    return new Response(JSON.stringify({ error: "Hotel ID is required" }), {
      status: 400,
    });
  }

  try {
    await connectToDatabase();
    const hotel = await Hotel.findById(id);

    return new Response(JSON.stringify({ hotel }), { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const session = await getSession(req);

    if (!session) {
      return NextResponse.json(
        { message: "Not logged in" },
        { status: 401 }
      );
    }

    const userId = session.user._id;

    const body = await req.json();
    const {
      checkInDate,
      checkOutDate,
      confirmationNumber,
      firstname,
      hotelId,
      lastname,
      telephone,
    } = body;

    // Optionally validate the request body here

    const newReservation = new Reservation({
      userId,
      hotelId,
      checkInDate,
      checkOutDate,
      confirmationNumber,
      firstname,
      lastname,
      telephone,
    });

    const savedReservation = await newReservation.save();

    return NextResponse.json(
      { reservation: savedReservation },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error:", e);

    if (e instanceof Error) {
      // Check if it's a validation error (e.g., from Mongoose)
      if (e.name === "ValidationError") {
        return NextResponse.json(
          { error: e.message },
          { status: 400 }
        );
      }

      // For other known errors, return the error message
      return NextResponse.json(
        { error: e.message },
        { status: 500 }
      );
    }

    // If 'e' is not an instance of Error, return a generic error message
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
