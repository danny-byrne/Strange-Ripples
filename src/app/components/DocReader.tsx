import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import BlogImage from "./BlogImage";
import QuoteContainer from "./QuoteContainer";
import VideoContainer from "./VideoContainer";
import HorizontalLine from "./HorizontalLine";
import {
  determineNodeType,
  processNode,
  imagePaths,
  removeYouTubePrefix,
} from "./utils";

interface DocxReaderProps {
  setLoading: (loading: boolean) => void;
}

const DocxReader: React.FC<DocxReaderProps> = ({ setLoading }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      .then((data) => {
        setHtmlContent(data.html);
        // setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const options = {
    replace(domNode: any) {
      const {
        isAnImageTag,
        isAQuoteBlock,
        isAVideoEmbed,
        isAHorizontalLine,
        isADateStamp,
      } = determineNodeType(domNode);

      if (isAnImageTag) {
        const { path, caption } = imagePaths[domNode.attribs.id];
        return <BlogImage src={path} caption={caption || ""} />;
      } else if (isAQuoteBlock) {
        const processedChildren = domNode.children.map((child: any) =>
          processNode(child)
        );

        return <QuoteContainer>{processedChildren}</QuoteContainer>;
      } else if (isAVideoEmbed) {
        const href = domNode?.attribs?.href;
        const videoId = removeYouTubePrefix(href);
        return <VideoContainer videoId={videoId} />;
      } else if (isAHorizontalLine) {
        return <HorizontalLine />;
      } else if (isADateStamp) {
        return <div className="datestamp">Published January 18th 2024</div>;
      }
    },
  };

  const content = parse(htmlContent, options);
  setLoading(false);
  return <>{content}</>;
};

export default DocxReader;
