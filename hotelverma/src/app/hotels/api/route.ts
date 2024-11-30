import { MongoClient } from "mongodb";

const uri = process.env.REACT_APP_MONGODB_URI || "your-default-uri-here";

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const data = await client
      .db("hotelverma")
      .collection("hotels")
      .find({})
      .toArray();

    const hotels = data.map((hotel: any) => ({
      _id: hotel._id.toString(),
      title: hotel.title,
      location: hotel.location,
      amenities: hotel.amenities || [],
      image: hotel.image || "/default-image.jpg", 
      price: hotel.price,
    }));

    return new Response(JSON.stringify({ hotels }), { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });

  }
}
