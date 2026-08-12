"use client";

import { useState } from "react";
import Image from "next/image";
import RsvpForm from "./rsvp-form";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Prónay-Kastély, Alsópetény, Kossuth Lajos utca 34, 2617"
  );

export default function Home() {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEnvelopeClick = () => {
    if (isClosing || isOpen) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  };

  return (
    <main className={`page${!isOpen ? " heroPage" : ""}`}>
      {!isOpen ? (
        <section
          className={`heroSection${isClosing ? " fading" : ""}`}
          onClick={handleEnvelopeClick}
        >
          <Image
            className="envelopeImg"
            src="/images/envelope.png"
            alt="Boríték"
            width={800}
            height={600}
            priority
          />
        </section>
      ) : (
        <div className="invitationContent">
          <section className="section">
            <h1 className="names">
              Doroti <span className="amp">&amp;</span> Jonatán
            </h1>
          </section>

          <section className="section infoSection">
            <p className="label">Dátum</p>
            <p className="value">2026. 10. 11.</p>

            <p className="label detailGap">Helyszín</p>
            <p className="value">
              Prónay-Kastély
              <br />
              Alsópetény, Kossuth Lajos utca 34, 2617
            </p>
            <a
              className="link"
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Megnyitás térképen
            </a>

            <p className="label detailGap">Vendégvárás</p>
            <p className="value">14:00</p>

            <p className="label detailGap">Dresscode</p>
            <p className="value">Sötét földszínek</p>
            <div className="colorPalette">
              <div className="colorRow">
                <span className="colorCircle" style={{ backgroundColor: "#101517" }} />
                <span className="colorCircle" style={{ backgroundColor: "#2a2c20" }} />
                <span className="colorCircle" style={{ backgroundColor: "#202423" }} />
              </div>
              <div className="colorRow">
                <span className="colorCircle" style={{ backgroundColor: "#2c221b" }} />
                <span className="colorCircle" style={{ backgroundColor: "#3a3228" }} />
                <span className="colorCircle" style={{ backgroundColor: "#262523" }} />
              </div>
            </div>
            <p className="dresscodeNote">
              Férfiaknak a sötét földszínek mellett
              <br />
              a fehér ing is megengedett.
            </p>
          </section>

          <section className="section rsvpSection">
            <RsvpForm />
          </section>

          <section className="section">
            <p className="body">
              Kérünk benneteket, hogy részvételi
              <br />
              szándékotokat <strong>2026. szeptember 10-ig bezárólag</strong>
              <br />
              jelezzétek számunkra.
            </p>
          </section>

          <section className="section quoteSection">
            <p className="quote">
              „<span className="quoteInitial">M</span>OST AZÉRT MEGMARAD A HIT,
              <br />
              REMÉNY, SZERETET, E HÁROM;
              <br />
              EZEK KÖZÖTT PEDIG LEGNAGYOBB A
              <br />
              SZERETET.”
            </p>
            <p className="quoteRef">1 Korinthus 13:13</p>
            <Image
              className="logoBottom"
              src="/images/embossed_logo.png"
              alt="Doroti & Jonatán"
              width={1040}
              height={1459}
            />
          </section>
        </div>
      )}
    </main>
  );
}
