import React from "react";
import parse from "html-react-parser";
import { parserOptions } from "./utils";

const fetchDoc = async () => {
  try {
    const response = await fetch("/api/docx");
    const data = await response.json();
    let content = parse(data.html, parserOptions);
    // content = content.slice(3, content.length);
    return content;
  } catch (err) {
    console.error(err);
  }
};

const DocxReader: React.FC = () => {
  let content = fetchDoc();

  return <>{content}</>;
};

export default DocxReader;
