import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import BlogImage from "./BlogImage";
import QuoteContainer from "./QuoteContainer";

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

  // useEffect(() => {
  //   console.log("htmlContent: ", htmlContent);
  // }, [htmlContent]);

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
      // console.log({ domNode }, "name:", domNode.name);
      const isAQuoteBlock = domNode?.attribs?.id === "quote";

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
        let content = "";
        for (let i = 0; i < domNode.children.length; i++) {
          const child = domNode.children[i];
          if (child.type === "text") {
            content += child.data;
          }
        }
        console.log({ content });
        // const content = domNode.children[0].data;
        return <QuoteContainer content={content} />;
        // console.log({ content });
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
