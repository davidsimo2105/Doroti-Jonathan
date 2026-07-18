import Image from "next/image";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(
    "Prónay-Kastély, Alsópetén, Kossuth Lajos utca 34, 2617"
  );

export default function Home() {
  return (
    <main className="page">
      <Image
        className="logo"
        src="/images/logo.png"
        alt="Doroti & Jonatán"
        width={1040}
        height={1459}
        priority
      />

      <section className="section">
        <h1 className="names">
          Doroti <span className="amp">&amp;</span> Jonatán
        </h1>
        <p className="date">2026. 10. 11.</p>
      </section>

      <div className="divider" />

      <section className="section">
        <p className="quote">
          „Most azért megmarad a hit, remény, szeretet, e három; ezek között
          pedig legnagyobb a szeretet.”
        </p>
        <p className="quoteRef">1 Korinthus 13:13</p>
      </section>

      <div className="divider" />

      <section className="section">
        <p className="label">Dátum</p>
        <p className="value">2026. 10. 11.</p>

        <p className="label detailGap">Helyszín</p>
        <p className="value">
          Prónay-Kastély
          <br />
          Alsópetén, Kossuth Lajos utca 34, 2617
        </p>
        <a
          className="link"
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Megnyitás térképen
        </a>
      </section>

      <div className="divider" />

      <section className="section">
        <p className="label">Dresscode</p>
        <p className="value">Sötét földszínek</p>
      </section>

      <div className="divider" />

      <section className="section">
        <p className="body">
          Kérünk benneteket, hogy részvételi szándékotokat
          <br />
          2026. augusztus 24-ig bezárólag jelezzétek számunkra.
        </p>
        <p className="body">
          Amennyiben gyermekeitekkel együtt érkeznétek, kérjük,
          <br />
          ezt a visszajelzésben külön jelezzétek.
        </p>

        <div className="contact">
          <p className="label">Kapcsolattartó</p>
          <span className="name">Mink Doroti</span>
          <a href="tel:+36303293832">+36 30 329 3832</a>
          <br />
          <a href="mailto:doroti.mink@gmail.com">doroti.mink@gmail.com</a>
        </div>
      </section>
    </main>
  );
}
