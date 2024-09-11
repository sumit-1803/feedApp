import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Item from '../../../../models/Item'; 

// Connect to MongoDB
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect("mongodb+srv://sumit:1212@test.vxqgx.mongodb.net/test");
};

// Handle GET request
export async function GET() {
  await connectDb();
  
  try {
    const items = await Item.find({});
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
