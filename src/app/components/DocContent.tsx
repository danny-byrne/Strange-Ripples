"use client";

import parse from "html-react-parser";
import { useMemo } from "react";
import { parserOptions } from "./utils";
import About from "./About";

export default function DocContent({ html }: { html: string }) {
  const content = useMemo(() => parse(html, parserOptions), [html]);

  return (
    <>
      {content}
      {content ? <About /> : null}
    </>
  );
}
