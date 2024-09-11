import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Item from '../../../models/Item';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sumit:1212@test.vxqgx.mongodb.net/test');
};

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const url = new URL(request.url);
        const category = url.searchParams.get('category');
        const filter = category ? { category } : {};
        const items = await Item.find(filter);
        return NextResponse.json(items);
    } catch (err: unknown) {
        console.error('Error fetching items:', err);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}