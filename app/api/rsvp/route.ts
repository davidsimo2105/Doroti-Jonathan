import { NextResponse } from 'next/server';
import { saveRSVP, getRSVPs } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await saveRSVP(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save RSVP", error);
    return NextResponse.json({ success: false, error: "Failed to save RSVP" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rsvps = await getRSVPs();
    return NextResponse.json({ success: true, rsvps });
  } catch (error) {
    console.error("Failed to read RSVPs", error);
    return NextResponse.json({ success: false, error: "Failed to read RSVPs" }, { status: 500 });
  }
}
