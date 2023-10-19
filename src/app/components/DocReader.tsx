import React, { useEffect, useState } from "react";
import parse, { DOMNode } from "html-react-parser";

type ImageMap = {
  [key: string]: { id: string; path: string };
};

const strangeRippleImageIdAsKeyPathAsValues: ImageMap = {
  carlJung: { id: "carlJung", path: "https://i.imgur.com/4QZKX0M.png" },
  carlJungBookImage: {
    id: "carlBookImage",
    path: "https://i.imgur.com/4QZKX0M.png",
  },
  ayaUFOs: { id: "ayaUFOs", path: "./images/ayaUFOs.png" },
};

const DocxReader: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    console.log({ htmlContent });
  }, [htmlContent]);

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      .then((data) => {
        setHtmlContent(data.html);
      })
      .catch((err) => console.error(err));
  }, []);

  const replaceDOM = (
    reactNode: string | React.ReactElement,
    domNode: any,
    index: number
  ): React.ReactElement | null => {
    console.log({ domNode });
    if (
      domNode.type === "tag" &&
      domNode.name === "p" &&
      domNode.children?.[0]?.data
    ) {
      const key = domNode.children[0].data;
      if (key in strangeRippleImageIdAsKeyPathAsValues) {
        return (
          <div
            id={
              strangeRippleImageIdAsKeyPathAsValues[
                key as keyof typeof strangeRippleImageIdAsKeyPathAsValues
              ].id
            }
          ></div>
        );
      }
    }
    return null; // Returning null when you don't want to replace anything
  };

  const replaceDOMTwo = (
    reactNode: string | React.ReactElement,
    domNode: any,
    index: number
  ) => {
    if (domNode.name === "p") {
      for (let key in strangeRippleImageIdAsKeyPathAsValues) {
        if (domNode.children[0].data === `<${key}>`) {
          return <div id={strangeRippleImageIdAsKeyPathAsValues[key].id}></div>;
        }
      }
    }
  };

  //TODONEXT: just load

  const content = parse(htmlContent, { transform: replaceDOM });
  console.log({ content });

  return (
    <>
      {/* <div id="test class">Hello</div> */}
      <div id="test class" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
};

export default DocxReader;
