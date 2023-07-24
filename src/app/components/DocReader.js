import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const strangeRippleImageIdAsKeyPathAsValues = {
  carlJung: { id: "carlJung", path: "https://i.imgur.com/4QZKX0M.png" },
  carlJungBookImage: {
    id: "carlBookImage",
    path: "https://i.imgur.com/4QZKX0M.png",
  },
  ayaUFOs: { id: "ayaUFOs", path: "./images/ayaUFOs.png" },
};

const DocxReader = () => {
  const [htmlContent, setHtmlContent] = useState("");
  // const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log({ htmlContent });
  }, [htmlContent]);

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      // .then((data) => console.log({ data }))
      .then((data) => {
        // const doc = new DOMParser().parseFromString(data.html, "text/xml");
        // const innerHTML = doc.firstChild.innerHTML;

        let html = data.html;

        // Replace the unique markers with placeholders for the images
        html = html.replace(
          `<${strangeRippleImageIdAsKeyPathAsValues.ayaUFOs.id}>`,
          `<div id="${strangeRippleImageIdAsKeyPathAsValues.ayaUFOs.id}"></div>`
        );

        setHtmlContent(html);
      })
      .catch((err) => console.error(err));
  }, []);

  const replaceDOM = (node) => {
    if (
      node.attribs &&
      node.attribs.id &&
      strangeRippleImageIdAsKeyPathAsValues[node.attribs.id]
    ) {
      return (
        <img
          src={strangeRippleImageIdAsKeyPathAsValues[node.attribs.id].path}
        />
      );
    }
  };

  return (
    <div className="test class">
      {parse(htmlContent, { replace: replaceDOM })}
    </div>
  );
};

export default DocxReader;
