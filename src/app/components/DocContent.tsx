"use client";

import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { parserOptions } from "./utils";
import About from "./About";

export default function DocContent({ html }: { html: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {parse(html, parserOptions)}
      <About />
    </>
  );
}
