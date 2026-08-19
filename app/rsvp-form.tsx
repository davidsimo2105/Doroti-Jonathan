"use client";

import { useState, type FormEvent } from "react";

const RSVP_EMAIL = "vidadoroti@gmail.com,vidajonatan777@gmail.com";

function onlyDigits(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export default function RsvpForm() {
  const [adultCount, setAdultCount] = useState("");
  const [adultNames, setAdultNames] = useState<string[]>([]);

  const [bringingKids, setBringingKids] = useState(false);
  const [childCount, setChildCount] = useState("");
  const [children, setChildren] = useState<{ name: string; age: string }[]>([]);

  const [notes, setNotes] = useState("");

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

    setChildren((prev) => {
      const newChildren = [...prev];
      if (count > newChildren.length) {
        for (let i = newChildren.length; i < count; i++)
          newChildren.push({ name: "", age: "" });
      } else if (count < newChildren.length) {
        newChildren.length = count;
      }
      return newChildren;
    });
  }

  function handleChildChange(idx: number, field: "name" | "age", value: string) {
    setChildren((prev) => {
      const newChildren = [...prev];
      newChildren[idx] = { ...newChildren[idx], [field]: value };
      return newChildren;
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
    const totalCount = adultCountNum + kidsNum;
    const isSingular = totalCount === 1;

    const mainName = adultNames[0] || "Vendég";
    const subject = `${mainName} - ${adultCountNum} felnőtt, ${kidsNum} gyerek – Doroti & Jonatán esküvő visszajelzés`;

    const participantsText =
      kidsNum > 0
        ? `${adultCountNum} felnőtt és ${kidsNum} gyermek`
        : `${adultCountNum} felnőtt`;

    const adultsList = adultNames.map((n, i) => `${i + 1}. ${n}`).join("\n");
    const kidsList =
      kidsNum > 0
        ? children
            .map((c, i) => `${i + 1}. gyermek neve: ${c.name}, életkora: ${c.age} éves`)
            .join("\n")
        : "";

    const introLine = isSingular
      ? "Ezúton szeretném visszaigazolni részvételemet esküvőtökön."
      : "Ezúton szeretnénk visszaigazolni részvételünket esküvőtökön.";

    const mainLine = isSingular
      ? `${mainName} néven jelentkezem, ${participantsText} részvételével.`
      : `${mainName} néven jelentkezünk, ${participantsText} részvételével.`;

    const outroLine = isSingular
      ? "Köszönöm a meghívást, és izgatottan várom a közös ünneplést."
      : "Köszönjük a meghívást, és izgatottan várjuk a közös ünneplést.";

    const body = [
      "Kedves Doroti és Jonatán!",
      "",
      introLine,
      mainLine,
      "",
      outroLine,
      "",
      "— Összegzés —",
      `Felnőtt vendégek (${adultCountNum} fő):`,
      adultsList,
      ...(kidsNum > 0 ? ["", `Gyerekek (${kidsNum} fő):`, kidsList] : []),
      ...(notes.trim() ? ["", `Megjegyzés (pl. ételérzékenység):`, notes.trim()] : []),
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
              setChildren([]);
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
        children.map((child, idx) => (
          <div key={`kid-${idx}`} style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "100%" }}>
            <label className="formField" style={{ flex: 1, minWidth: 0 }}>
              <span className="label" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {idx + 1}. Gyerek neve
              </span>
              <input
                className="formInput"
                type="text"
                required={bringingKids}
                value={child.name}
                onChange={(e) => handleChildChange(idx, "name", e.target.value)}
                placeholder={idx === 0 ? "pl. Kis Aladár" : ""}
                style={{ width: "100%" }}
              />
            </label>
            <label className="formField" style={{ flex: "0 0 5rem" }}>
              <span className="label" style={{ whiteSpace: "nowrap" }}>Életkora</span>
              <input
                className="formInput"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required={bringingKids}
                value={child.age}
                onChange={(e) =>
                  handleChildChange(idx, "age", onlyDigits(e.target.value))
                }
                placeholder={idx === 0 ? "pl. 5" : ""}
              />
            </label>
          </div>
        ))}

      <label className="formField" style={{ marginTop: "1rem" }}>
        <span className="label">Megjegyzés, ételérzékenység</span>
        <input
          className="formInput"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="pl. laktózérzékenység, vegán..."
        />
      </label>

      <button className="submitButton" type="submit" style={{ marginTop: "1.5rem" }}>
        Visszajelzés küldése
      </button>
    </form>
  );
}
