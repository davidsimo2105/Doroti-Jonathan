"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 2200));
    const fontsReady =
      "fonts" in document ? document.fonts.ready : Promise.resolve();

    Promise.all([minDelay, fontsReady]).then(() => setHidden(true));
  }, []);

  return (
    <div
      className={`loadingScreen${hidden ? " hidden" : ""}`}
      aria-hidden={hidden}
    >
      <Image src="/images/logo.png" alt="" width={1040} height={1459} priority />
    </div>
  );
}
