"use client";

import parse from "html-react-parser";
import { useEffect, useMemo, useState } from "react";
import { parserOptions } from "./utils";
import About from "./About";

export default function DocContent({ html }: { html: string }) {
  const content = useMemo(() => parse(html, parserOptions), [html]);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setShowAbout(true);
    }, 1200);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {content}
      {showAbout ? <About /> : null}
    </>
  );
}
