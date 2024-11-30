import { MongoClient } from "mongodb";

const uri = process.env.REACT_APP_MONGODB_URI || "your-default-uri-here";
const datab = process.env.REACT_APP_DB || "your-default-here";
const collectionHotels = process.env.REACT_APP_HOTELS || "your-default-here";

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

if (!uri) {
  throw new Error("MongoDB URI is not defined in environment variables.");
}

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(datab);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection(collectionHotels).find({}).toArray();

    const hotels = data.map((hotel: any) => ({
      _id: hotel._id.toString(),
      title: hotel.title,
      location: hotel.location,
      amenities: hotel.amenities || [],
      image: hotel.image || "/default-image.jpg", 
      price: hotel.price,
      rating: hotel.rating,
    }));

    return new Response(JSON.stringify({ hotels }), { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });

  }
}
