"use client";

import { useState, useEffect } from "react";
import { type RSVP, getRSVPs, deleteRSVP } from "@/lib/db";
import "../globals.css";

export default function FeedbackPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRSVPs();
      setRsvps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "eskuvo2026") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "eskuvo2026") {
      localStorage.setItem("adminAuth", "eskuvo2026");
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError("Helytelen jelszó");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a jelentkezést?")) return;
    try {
      await deleteRSVP(id);
      setRsvps(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      console.error("Törlési hiba:", e);
      alert("Hálózati hiba történt a törlés során.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background)", overflow: "hidden", padding: "1rem" }}>
        <div style={{ padding: "2rem", backgroundColor: "var(--foreground)", color: "var(--background)", borderRadius: "1rem", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <h1 style={{ marginBottom: "2rem", fontSize: "1.5rem" }}>Admin Bejelentkezés</h1>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--background)",
                backgroundColor: "transparent",
                color: "var(--background)",
                outline: "none",
                fontFamily: "inherit"
              }}
            />
            {error && <p style={{ color: "#d9534f", fontSize: "0.9rem", margin: 0 }}>{error}</p>}
            <button
              type="submit"
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "1rem",
                fontFamily: "inherit",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}
            >
              Belépés
            </button>
          </form>
        </div>
      </div>
    );
  }

  const attending = rsvps.filter(r => r.attendance === "attending");
  const declining = rsvps.filter(r => r.attendance === "declining");

  const totalAdults = attending.reduce((sum, r) => sum + (r.adultCount || 0), 0);
  const totalKids = attending.reduce((sum, r) => sum + (r.children?.length || 0), 0);

  return (
    <div className="page adminPage">
      <h1 className="names" style={{ marginBottom: "2rem", textAlign: "center" }}>Visszajelzések</h1>
      
      {loading ? (
        <p style={{ textAlign: "center" }}>Betöltés...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          <section>
            <h2>
              Ott lesznek ({attending.length} család / visszajelzés)
            </h2>
            <p style={{ marginBottom: "1.5rem", opacity: 0.8 }}>
              Összesen: <strong>{totalAdults} felnőtt</strong> és <strong>{totalKids} gyerek</strong>
            </p>
            
            {attending.length === 0 ? (
              <p style={{ opacity: 0.6 }}>Még nincs pozitív visszajelzés.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {attending.map((rsvp) => (
                  <div key={rsvp.id} style={{ border: "1px solid var(--foreground)", padding: "1.5rem", borderRadius: "0.5rem", position: "relative" }}>
                    <div className="adminCardHeader">
                      <strong style={{ fontSize: "1.2rem", wordBreak: "break-word" }}>{rsvp.adultNames?.join(", ")}</strong>
                      <div className="adminCardActions">
                        <span style={{ fontSize: "0.85rem", opacity: 0.7, whiteSpace: "nowrap" }}>
                          {new Date(rsvp.createdAt).toLocaleString("hu-HU", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button 
                          onClick={() => handleDelete(rsvp.id)}
                          style={{ backgroundColor: "transparent", color: "#d9534f", border: "none", padding: "0.25rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Törlés"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p style={{ margin: "0.5rem 0" }}>Létszám: {rsvp.adultCount} felnőtt</p>
                    
                    {rsvp.bringingKids && rsvp.children && rsvp.children.length > 0 && (
                      <div style={{ margin: "0.5rem 0" }}>
                        <p style={{ margin: "0 0 0.25rem 0" }}>Gyerekek ({rsvp.children.length}):</p>
                        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                          {rsvp.children.map((child, idx) => (
                            <li key={idx}>{child.name} ({child.age} éves)</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {rsvp.notes && (
                      <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "0.25rem" }}>
                        <strong>Megjegyzés:</strong> {rsvp.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2>
              Nem tudnak részt venni ({declining.length})
            </h2>
            
            {declining.length === 0 ? (
              <p style={{ opacity: 0.6 }}>Még senki sem mondta le.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {declining.map((rsvp) => (
                  <div key={rsvp.id} className="adminCardDeclined">
                    <span style={{ wordBreak: "break-word" }}>{rsvp.declinerName}</span>
                    <div className="adminCardActions">
                      <span style={{ fontSize: "0.85rem", opacity: 0.7, whiteSpace: "nowrap" }}>
                        {new Date(rsvp.createdAt).toLocaleString("hu-HU", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button 
                        onClick={() => handleDelete(rsvp.id)}
                        style={{ backgroundColor: "transparent", color: "#d9534f", border: "none", padding: "0.25rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Törlés"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      )}
    </div>
  );
}
