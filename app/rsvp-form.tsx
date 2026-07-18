"use client";

import { useState, type FormEvent } from "react";

const RSVP_EMAIL = "doroti.mink@gmail.com";

function onlyDigits(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function onlyAgesList(value: string) {
  return value.replace(/[^0-9,\s]/g, "");
}

export default function RsvpForm() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [childAges, setChildAges] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const children = Number(childCount) || 0;
    const fullName = `${firstName} ${lastName}`.trim();
    const subjectName = `${lastName} ${firstName}`.trim();
    const agesNote = children > 0 && childAges ? ` (${childAges} éves)` : "";
    const childrenClause =
      children > 0 ? `, melyből ${children} gyermek${agesNote}` : "";

    const subject = `${subjectName} - ${guestCount} fő, ${children} gyerek – Doroti & Jonatán esküvő visszajelzés`;
    const body = [
      "Kedves Doroti és Jonatán!",
      "",
      "Ezúton szeretnénk visszaigazolni részvételünket esküvőtökön.",
      `${fullName} néven jelentkezünk, ${guestCount} fő részvételével${childrenClause}.`,
      "",
      "Köszönjük a meghívást, és izgatottan várjuk a közös ünneplést.",
      "",
      "— Összegzés —",
      `Név: ${fullName}`,
      `Létszám: ${guestCount} fő`,
      `Ebből gyermek: ${children} fő`,
      ...(children > 0 && childAges ? [`Gyerekek életkora: ${childAges}`] : []),
    ].join("\n");

    const mailto = `mailto:${RSVP_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form className="rsvpForm" onSubmit={handleSubmit}>
      <div className="formRow">
        <label className="formField">
          <span className="label">Családnév</span>
          <input
            className="formInput"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="formField">
          <span className="label">Keresztnév</span>
          <input
            className="formInput"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>

      <div className="formRow">
        <label className="formField">
          <span className="label">Létszám</span>
          <input
            className="formInput"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={guestCount}
            onChange={(e) => setGuestCount(onlyDigits(e.target.value))}
          />
        </label>
        <label className="formField">
          <span className="label">Gyerekek</span>
          <input
            className="formInput"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={childCount}
            onChange={(e) => setChildCount(onlyDigits(e.target.value))}
          />
        </label>
      </div>

      <label className="formField">
        <span className="label">Gyerekek életkora</span>
        <input
          className="formInput"
          type="text"
          inputMode="numeric"
          placeholder="pl. 5, 8"
          value={childAges}
          onChange={(e) => setChildAges(onlyAgesList(e.target.value))}
        />
      </label>

      <button className="submitButton" type="submit">
        Visszajelzés küldése
      </button>
    </form>
  );
}
