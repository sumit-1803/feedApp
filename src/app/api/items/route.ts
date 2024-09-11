import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Item from '../../../models/Item'; 

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI || 'your-mongodb-uri'); 
};

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const filter = category ? { category } : {}; 
    const items = await Item.find(filter);
    return NextResponse.json(items);
  } catch (err: Error | any) {
    return NextResponse.json({"error": err.message}, { status: 500 });
  }
}
