"use client";

import { useState, useEffect } from "react";
import type { RSVP } from "@/lib/db";
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
      const res = await fetch("/api/rsvp");
      const data = await res.json();
      if (data.success) {
        setRsvps(data.rsvps);
      }
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

  if (!isAuthenticated) {
    return (
      <div className="page" style={{ justifyContent: "center", minHeight: "100vh" }}>
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
                outline: "none"
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
                marginTop: "1rem"
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
    <div className="page" style={{ paddingTop: "4rem", paddingBottom: "4rem", width: "100%", maxWidth: "800px", margin: "0 auto", alignItems: "stretch" }}>
      <h1 className="names" style={{ marginBottom: "2rem", textAlign: "center" }}>Visszajelzések</h1>
      
      {loading ? (
        <p style={{ textAlign: "center" }}>Betöltés...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          <section>
            <h2 style={{ fontSize: "1.5rem", borderBottom: "1px solid var(--foreground)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
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
                  <div key={rsvp.id} style={{ border: "1px solid var(--foreground)", padding: "1.5rem", borderRadius: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <strong style={{ fontSize: "1.2rem" }}>{rsvp.adultNames?.join(", ")}</strong>
                      <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                        {new Date(rsvp.createdAt).toLocaleString("hu-HU", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                      </span>
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
            <h2 style={{ fontSize: "1.5rem", borderBottom: "1px solid var(--foreground)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Nem tudnak részt venni ({declining.length})
            </h2>
            
            {declining.length === 0 ? (
              <p style={{ opacity: 0.6 }}>Még senki sem mondta le.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {declining.map((rsvp) => (
                  <div key={rsvp.id} style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "1rem", borderRadius: "0.5rem", display: "flex", justifyContent: "space-between" }}>
                    <span>{rsvp.declinerName}</span>
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                      {new Date(rsvp.createdAt).toLocaleString("hu-HU", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </span>
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
