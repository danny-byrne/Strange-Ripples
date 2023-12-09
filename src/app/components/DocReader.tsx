import React, { useEffect, useState } from "react";
import parse, { DOMNode } from "html-react-parser";
import BlogImage from "./BlogImage";

type ImageMap = {
  [key: string]: { id: string; path: string; caption?: string };
};

const imagePaths: ImageMap = {
  carlJung: {
    id: "carlJung",
    path: "https://i.imgur.com/4QZKX0M.png",
    caption: "Carl Jung",
  },
  carlBookImage: {
    id: "carlBookImage",
    path: "/images/CarlJungBook.png",
    caption: "Carl Jung's Essay on UFOs was published in 1957.",
  },
  ayaUFOs: {
    id: "ayaUFOs",
    path: "/images/ayaUFOs.png",
    caption:
      "Fanciful UFO like objects depicted in the Ayahuasca inspired artwork of Pablo Amaringo.",
  },
};

const DocxReader: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    console.log("htmlContent: ", htmlContent);
  }, [htmlContent]);

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      .then((data) => {
        setHtmlContent(data.html);
      })
      .catch((err) => console.error(err));
  }, []);

  const options = {
    replace(
      domNode: DOMNode
    ): false | void | object | Element | null | undefined {
      console.log({ domNode });
      if (
        domNode.type === "tag" &&
        "attribs" in domNode &&
        domNode.attribs &&
        domNode.attribs.id &&
        imagePaths[domNode.attribs.id]
      ) {
        console.log("id: ", domNode.attribs.id);

        const { path, caption } = imagePaths[domNode.attribs.id];
        return <BlogImage src={path} caption={caption || ""} />;
      }
    },
  };

  //todo, create image component with caption

  const content = parse(htmlContent, options);
  console.log({ content });

  return (
    <>
      {/* <div className="test"> */}
      {/* <StyledPage>{content}</StyledPage> */}
      Hello World Hello World Hello World Hello World Hello World
      {/* </div> */}
    </>
  );
};

export default DocxReader;
