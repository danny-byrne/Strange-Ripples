"use client";

import parse from "html-react-parser";
import { useEffect, useState, useTransition } from "react";
import { parserOptions } from "./utils";
import About from "./About";

export default function DocContent({ html }: { html: string }) {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const id = window.setTimeout(() => {
      startTransition(() => {
        setContent(parse(html, parserOptions));
      });
    }, 0);

    return () => window.clearTimeout(id);
  }, [html]);

  return (
    <>
      {content}
      <About />
    </>
  );
}
