import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import BlogImage from "./BlogImage";
import QuoteContainer from "./QuoteContainer";
import { determineNodeType, processNode, imagePaths } from "./utils";

type ImageMap = {
  [key: string]: { id: string; path: string; caption?: string };
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
    replace(domNode: any) {
      const { isAnImageTag, isAQuoteBlock } = determineNodeType(domNode);

      if (isAnImageTag) {
        const { path, caption } = imagePaths[domNode.attribs.id];
        return <BlogImage src={path} caption={caption || ""} />;
      } else if (isAQuoteBlock) {
        console.log({ domNode });
        const processedChildren = domNode.children.map((child: any) =>
          processNode(child)
        );

        return <QuoteContainer>{processedChildren}</QuoteContainer>;
      }
    },
  };

  const content = parse(htmlContent, options);

  return <>{content}</>;
};

export default DocxReader;
