import React, { useEffect, useState } from "react";

const DocxReader = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    console.log({ htmlContent });
  }, [htmlContent]);

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      // .then((data) => console.log({ data }))
      .then((data) => {
        const doc = new DOMParser().parseFromString(data.html, "text/xml");
        const innerHTML = doc.firstChild.innerHTML;
        const html = data.html;
        setHtmlContent(html);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="test class">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default DocxReader;
