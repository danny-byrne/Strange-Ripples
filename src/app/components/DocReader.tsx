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

interface DocxReaderProps {
  setLoading: (value: boolean) => void;
}

const DocxReader: React.FC<DocxReaderProps> = ({ setLoading }) => {
  let content = fetchDoc();
  setLoading(false);
  return <>{content}</>;
};

export default DocxReader;
