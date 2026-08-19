import fs from 'fs';
import path from 'path';

export interface RSVP {
  id: string;
  createdAt: string;
  attendance: "attending" | "declining";
  declinerName?: string;
  adultCount?: number;
  adultNames?: string[];
  bringingKids?: boolean;
  children?: { name: string; age: string }[];
  notes?: string;
}

const DB_PATH = path.join(process.cwd(), 'rsvps.json');

export function getRSVPs(): RSVP[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data) as RSVP[];
  } catch (error) {
    console.error("Error reading RSVPs:", error);
    return [];
  }
}

export function saveRSVP(rsvp: Omit<RSVP, 'id' | 'createdAt'>): void {
  const current = getRSVPs();
  const newRSVP: RSVP = {
    ...rsvp,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  current.push(newRSVP);
  fs.writeFileSync(DB_PATH, JSON.stringify(current, null, 2));
}
