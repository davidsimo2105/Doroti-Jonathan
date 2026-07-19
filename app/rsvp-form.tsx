"use client";

import { useState, type FormEvent } from "react";

const RSVP_EMAIL = "doroti.mink@gmail.com";

function onlyDigits(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export default function RsvpForm() {
  const [adultCount, setAdultCount] = useState("");
  const [adultNames, setAdultNames] = useState<string[]>([]);

  const [bringingKids, setBringingKids] = useState(false);
  const [childCount, setChildCount] = useState("");
  const [childAges, setChildAges] = useState<string[]>([]);

  function handleAdultCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = onlyDigits(e.target.value);
    setAdultCount(val);
    const count = parseInt(val, 10) || 0;

    setAdultNames((prev) => {
      const newNames = [...prev];
      if (count > newNames.length) {
        for (let i = newNames.length; i < count; i++) newNames.push("");
      } else if (count < newNames.length) {
        newNames.length = count;
      }
      return newNames;
    });
  }

  function handleAdultNameChange(idx: number, value: string) {
    setAdultNames((prev) => {
      const newNames = [...prev];
      newNames[idx] = value;
      return newNames;
    });
  }

  function handleChildCountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = onlyDigits(e.target.value);
    setChildCount(val);
    const count = parseInt(val, 10) || 0;

    setChildAges((prev) => {
      const newAges = [...prev];
      if (count > newAges.length) {
        for (let i = newAges.length; i < count; i++) newAges.push("");
      } else if (count < newAges.length) {
        newAges.length = count;
      }
      return newAges;
    });
  }

  function handleChildAgeChange(idx: number, value: string) {
    setChildAges((prev) => {
      const newAges = [...prev];
      newAges[idx] = value;
      return newAges;
    });
  }

  const adultCountNum = parseInt(adultCount, 10) || 0;
  const isAdultsFilled =
    adultCountNum > 0 &&
    adultNames.length === adultCountNum &&
    adultNames.every((name) => name.trim().length > 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const kidsNum = bringingKids ? parseInt(childCount, 10) || 0 : 0;

    const mainName = adultNames[0] || "Vendég";
    const subject = `${mainName} - ${adultCountNum} fő, ${kidsNum} gyerek – Doroti & Jonatán esküvő visszajelzés`;

    const childrenClause = kidsNum > 0 ? `, melyből ${kidsNum} gyermek` : "";

    const adultsList = adultNames.map((n, i) => `${i + 1}. ${n}`).join("\n");
    const kidsList =
      kidsNum > 0
        ? childAges
            .map((age, i) => `${i + 1}. gyermek életkora: ${age} éves`)
            .join("\n")
        : "";

    const body = [
      "Kedves Doroti és Jonatán!",
      "",
      "Ezúton szeretnénk visszaigazolni részvételünket esküvőtökön.",
      `${mainName} néven jelentkezünk, ${adultCountNum} fő (felnőtt) részvételével${childrenClause}.`,
      "",
      "Köszönjük a meghívást, és izgatottan várjuk a közös ünneplést.",
      "",
      "— Összegzés —",
      `Felnőtt vendégek (${adultCountNum} fő):`,
      adultsList,
      ...(kidsNum > 0 ? ["", `Gyerekek (${kidsNum} fő):`, kidsList] : []),
    ].join("\n");

    const mailto = `mailto:${RSVP_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form className="rsvpForm" onSubmit={handleSubmit}>
      <label className="formField">
        <span className="label">Felnőttek létszáma</span>
        <input
          className="formInput"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          value={adultCount}
          onChange={handleAdultCountChange}
          placeholder="pl. 2"
        />
      </label>

      {adultNames.map((name, idx) => (
        <label key={`adult-${idx}`} className="formField">
          <span className="label">{idx + 1}. Felnőtt neve</span>
          <input
            className="formInput"
            type="text"
            required
            value={name}
            onChange={(e) => handleAdultNameChange(idx, e.target.value)}
            placeholder={idx === 0 ? "pl. Kiss Péter" : ""}
          />
        </label>
      ))}

      <label
        className="formField"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "0.75rem",
          marginTop: "1rem",
          cursor: isAdultsFilled ? "pointer" : "not-allowed",
          opacity: isAdultsFilled ? 1 : 0.5,
        }}
      >
        <input
          type="checkbox"
          className="customCheckbox"
          checked={bringingKids}
          disabled={!isAdultsFilled}
          onChange={(e) => {
            setBringingKids(e.target.checked);
            if (!e.target.checked) {
              setChildCount("");
              setChildAges([]);
            }
          }}
        />
        <span className="label" style={{ marginBottom: 0, marginTop: "2px" }}>
          Gyerekekkel érkezünk
        </span>
      </label>

      {bringingKids && (
        <label className="formField">
          <span className="label">Gyerekek létszáma</span>
          <input
            className="formInput"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            required={bringingKids}
            value={childCount}
            onChange={handleChildCountChange}
            placeholder="pl. 1"
          />
        </label>
      )}

      {bringingKids &&
        childAges.map((age, idx) => (
          <label key={`kid-${idx}`} className="formField">
            <span className="label">{idx + 1}. Gyerek életkora</span>
            <input
              className="formInput"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required={bringingKids}
              value={age}
              onChange={(e) =>
                handleChildAgeChange(idx, onlyDigits(e.target.value))
              }
              placeholder={idx === 0 ? "pl. 5" : ""}
            />
          </label>
        ))}

      <button className="submitButton" type="submit" style={{ marginTop: "1rem" }}>
        Visszajelzés küldése
      </button>
    </form>
  );
}
