import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { parserOptions } from "../utils";

type ParsedDoc = string | React.ReactElement | React.ReactElement[] | null;

const fetchDoc = async (): Promise<ParsedDoc> => {
  const response = await fetch("/api/docx");
  const data = await response.json();
  return parse(data.html, parserOptions) as ParsedDoc;
};

interface DocReaderProps {
  setLoading: (isLoading: boolean) => void;
}

const DocReader: React.FC<DocReaderProps> = ({ setLoading }) => {
  const [displayedContent, setDisplayedContent] = useState<ParsedDoc>(null);

  useEffect(() => {
    fetchDoc().then((content) => {
      setDisplayedContent(content);
      setLoading(false);
    });
  }, [setLoading]);

  return <>{displayedContent}</>;
};

export default DocReader;
