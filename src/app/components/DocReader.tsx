import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import BlogImage from "./BlogImage";
import QuoteContainer from "./QuoteContainer";
import { extractTextNodes, processNode } from "./utils";

type ImageMap = {
  [key: string]: { id: string; path: string; caption?: string };
};

const imagePaths: ImageMap = {
  testImage: {
    id: "testImage",
    path: "/images/image1.png",
    caption: "Some text image",
  },
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

  const options = {
    replace(
      //   domNode: DOMNode
      // ): false | void | object | Element | null | undefined {
      domNode: any
    ) {
      const isAQuoteBlock =
        domNode?.attribs?.id === "quote" &&
        domNode?.name === "div" &&
        domNode?.children?.length > 0;

      const isAnImageTag =
        domNode.type === "tag" &&
        "attribs" in domNode &&
        domNode.attribs &&
        domNode.attribs.id &&
        imagePaths[domNode.attribs.id];

      if (isAnImageTag) {
        const { path, caption } = imagePaths[domNode.attribs.id];
        return <BlogImage src={path} caption={caption || ""} />;
      } else if (isAQuoteBlock) {
        console.log({ domNode });
        const processedChildren = domNode.children.map((child) =>
          processNode(child)
        );

        // Return a React element representing the quote block
        return <QuoteContainer>{processedChildren}</QuoteContainer>;
        //this is where I would like to pass the domNode and it's children as a react element to a react component
      }
    },
  };

  const content = parse(htmlContent, options);

  const testHtmlString =
    // "<html><body><div>some other text</div><div>Some test text</div></body></html>";
    "<div>some other text</div><div>Some test text</div>";
  // console.log({ content });

  const testContent = parse(testHtmlString);
  // console.log({ testContent });

  return (
    <>
      {/* when { content } is uncommented, the blue background disappears 
      and the the text of the doc is displayed with images, no styling is applied
      and the "Hello World" on the lines below do not appear.
    */}
      {/* uncomment this to test vvvv */}
      {content}
      {/* {testContent} */}
      Hello World Hello World Hello World Hello World Hello World
    </>
  );
};

export default DocxReader;
