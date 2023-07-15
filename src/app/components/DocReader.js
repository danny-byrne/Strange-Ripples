import React, { useEffect, useState } from "react";

const DocxReader = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      .then((data) => console.log({ data }))
      .then((data) => setHtmlContent(data.html))
      .catch((err) => console.error(err));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default DocxReader;
