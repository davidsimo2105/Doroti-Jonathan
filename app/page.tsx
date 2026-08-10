import Image from "next/image";
import RsvpForm from "./rsvp-form";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Prónay-Kastély, Alsópetény, Kossuth Lajos utca 34, 2617"
  );

export default function Home() {
  return (
    <main className="page">
      <section className="heroSection">
        <Image
          className="envelopeImg"
          src="/images/envelope.png"
          alt="Boríték"
          width={800}
          height={600}
          priority
        />
      </section>

      <Image
        className="logo"
        src="/images/logo.png"
        alt="Doroti & Jonatán"
        width={1040}
        height={1459}
      />

      <section className="section">
        <h1 className="names">
          Doroti <span className="amp">&amp;</span>
          <br />
          Jonatán
        </h1>
        <p className="date">2026. 10. 11.</p>
      </section>

      <section className="section">
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
      </section>

      <section className="section">
        <RsvpForm />
      </section>

      <div className="divider" />

      <section className="section">
        <p className="body">
          Kérünk benneteket, hogy részvételi
          <br />
          szándékotokat <strong>2026. augusztus 24-ig bezárólag</strong>
          <br />
          jelezzétek számunkra.
        </p>
      </section>

      <div className="divider" />

      <section className="section">
        <p className="label">Dresscode</p>
        <p className="value">Sötét földszínek</p>
        <div className="colorPalette">
          <div className="colorRow">
            <span className="colorCircle" style={{ backgroundColor: "#202423" }} />
            <span className="colorCircle" style={{ backgroundColor: "#353024" }} />
            <span className="colorCircle" style={{ backgroundColor: "#40352e" }} />
            <span className="colorCircle" style={{ backgroundColor: "#101517" }} />
          </div>
          <div className="colorRow">
            <span className="colorCircle" style={{ backgroundColor: "#1f1f17" }} />
            <span className="colorCircle" style={{ backgroundColor: "#211d14" }} />
            <span className="colorCircle" style={{ backgroundColor: "#141d1a" }} />
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="contact" style={{ marginTop: 0 }}>
          <p className="label">Kapcsolattartó</p>
          <span className="name">Mink Doroti</span>
          <a href="tel:+36303293832">+36 30 329 3832</a>
        </div>
      </section>

      <div className="divider" />

      <section className="section quoteSection">
        <p className="quote">
          „<span className="quoteInitial">M</span>OST AZÉRT MEGMARAD
          <br />
          A HIT, REMÉNY, SZERETET,
          <br />
          E HÁROM; EZEK KÖZÖTT PEDIG
          <br />
          LEGNAGYOBB A SZERETET.”
        </p>
        <p className="quoteRef">1 Korinthus 13:13</p>
      </section>
    </main>
  );
}
