import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import BlogImage from "./BlogImage";
import QuoteContainer from "./QuoteContainer";
import VideoContainer from "./VideoContainer";
import {
  determineNodeType,
  processNode,
  imagePaths,
  removeYouTubePrefix,
} from "./utils";

const DocxReader: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");

  // useEffect(() => {
  //   console.log({ htmlContent });
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
    replace(domNode: any) {
      const { isAnImageTag, isAQuoteBlock, isAVideoEmbed } =
        determineNodeType(domNode);

      if (isAnImageTag) {
        const { path, caption } = imagePaths[domNode.attribs.id];
        return <BlogImage src={path} caption={caption || ""} />;
      } else if (isAQuoteBlock) {
        // console.log({ domNode });
        const processedChildren = domNode.children.map((child: any) =>
          processNode(child)
        );

        return <QuoteContainer>{processedChildren}</QuoteContainer>;
      } else if (isAVideoEmbed) {
        const href = domNode?.attribs?.href;
        const videoId = removeYouTubePrefix(href);
        //todo, make UI conainer with caption
        return <VideoContainer videoId={videoId} />;
      }
    },
  };

  const content = parse(htmlContent, options);

  return <>{content}</>;
};

export default DocxReader;
