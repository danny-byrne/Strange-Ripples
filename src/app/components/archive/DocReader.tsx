import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { parserOptions } from "../utils";

const fetchDoc = async (): Promise<JSX.Element[]> => {
  try {
    const response = await fetch("/api/docx");
    const data = await response.json();
    let content = parse(data.html, parserOptions);

    return content as JSX.Element[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

interface DocxReaderProps {
  setLoading: (value: boolean) => void;
}

const DocxReader: React.FC<DocxReaderProps> = ({ setLoading }) => {
  const [displayedContent, setDisplayedContent] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetchDoc().then((content) => {
      setDisplayedContent(content);
      setLoading(false);
    });
  }, []);

  return <>{displayedContent}</>;
};

export default DocxReader;
