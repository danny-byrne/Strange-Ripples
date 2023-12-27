import React, { useEffect, useState } from "react";
import parse, { DOMNode } from "html-react-parser";
import BlogImage from "./BlogImage";

type ImageMap = {
  [key: string]: { id: string; path: string; caption?: string };
};

const imagePaths: ImageMap = {
  testimage: {
    id: "testimage",
    path: "/images/image1.png",
    caption: "Some text image",
  },
};

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

  //todo, create image component with caption

  const content = parse(htmlContent, options);
  console.log({ content });

  return (
    <>
      {/* when { content } is uncommented, the blue background disappears 
      and the the text of the doc is displayed with images, no styling is applied
      and the "Hello World" on the lines below do not appear.
    */}
      {content}
      Hello World Hello World Hello World Hello World Hello World
    </>
  );
};

export default DocxReader;
