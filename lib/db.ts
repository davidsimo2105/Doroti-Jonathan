import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

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

const firebaseConfig = {
  apiKey: "AIzaSyBlt45m-ILw9MmosQ6eynbJ2xoJqM-3jKY",
  authDomain: "doroti-es-jonatan.firebaseapp.com",
  projectId: "doroti-es-jonatan",
  storageBucket: "doroti-es-jonatan.firebasestorage.app",
  messagingSenderId: "352300789459",
  appId: "1:352300789459:web:ddbe9edf89434176dfae26",
  measurementId: "G-8H714G7RRM"
};

// Initialize Firebase once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function getRSVPs(): Promise<RSVP[]> {
  try {
    const rsvpsRef = collection(db, "rsvps");
    const q = query(rsvpsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RSVP));
  } catch (error) {
    console.error("Error reading RSVPs from Firestore:", error);
    return [];
  }
}

export async function saveRSVP(rsvp: Omit<RSVP, 'id' | 'createdAt'>): Promise<void> {
  const rsvpsRef = collection(db, "rsvps");
  const newRSVP = {
    ...rsvp,
    createdAt: new Date().toISOString()
  };
  await addDoc(rsvpsRef, newRSVP);
}
