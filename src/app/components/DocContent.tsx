"use client";

import parse from "html-react-parser";
import { parserOptions } from "./utils";

export default function DocContent({ html }: { html: string }) {
  return <>{parse(html, parserOptions)}</>;
}
