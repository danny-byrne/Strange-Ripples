import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

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
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    if (htmlContent) {
      ReactDOM.render(
        <img src="./images/ayaUFOs.png" />,
        document.getElementById("ayaUFOs")
      );

      // setMounted(true);
    }
  }, [htmlContent]);

  return (
    <div className="test class">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default DocxReader;
