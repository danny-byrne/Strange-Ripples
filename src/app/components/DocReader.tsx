import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

import { parserOptions } from "./utils";

interface DocxReaderProps {
  setLoading: (loading: boolean) => void;
}

const DocxReader: React.FC<DocxReaderProps> = ({ setLoading }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      .then((data) => {
        setHtmlContent(data.html);
      })
      .catch((err) => console.error(err));
  }, []);

  let content: any = parse(htmlContent, parserOptions);
  content = content.slice(3, content.length);
  // console.log({ content });
  setLoading(false);
  return <>{content}</>;
};

export default DocxReader;
