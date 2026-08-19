import { NextResponse } from 'next/server';
import { saveRSVP, getRSVPs, deleteRSVP } from '@/lib/db';

export const dynamic = 'force-dynamic';

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


export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "No ID provided" }, { status: 400 });
    await deleteRSVP(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete RSVP", error);
    return NextResponse.json({ success: false, error: "Failed to delete RSVP" }, { status: 500 });
  }
}
