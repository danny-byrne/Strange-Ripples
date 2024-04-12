import React from "react";

import BlogImage from "./BlogImage";
import { QuoteContainer, InfoContainer } from "./QuoteContainer";
import VideoContainer from "./VideoContainer";
import HorizontalLine from "./HorizontalLine";
import { colors, pixelWidths, imagePaths } from "./constants";

type Element = {
  attribs: Record<string, any>;
  children: Element[];
  endIndex: null | number;
  name: string;
  next: Element | null;
  parent: Element | null;
  prev: Element | null;
  startIndex: null | number;
  type: string;
  data: string;
};

type QuoteContainerProps = {
  content: Element[];
};

const voidElements = ["br" /* add other void elements here */];

const createLinkElement = (domnode: any) => {
  const href = domnode.attribs.href;
  const text = domnode.children[0].data;
  return React.createElement(
    "a",
    { href, target: "_blank", rel: "noopener noreferrer" },
    text
  );
};

const processNode = (node: any) => {
  const isATextNode = node.type === "text";
  const isATag = node.type === "tag";
  if (isATextNode) {
    // Text node, just return the text
    return node.data;
  } else if (isATag) {
    // a tag element will have children that will need to be parsed through recursively to handle links, text, etc...
    const isALink = Boolean(node.attribs?.href);

    if (isALink) {
      return createLinkElement(node);
    }

    // Check for void elements
    if (voidElements.includes(node.name)) {
      // Return a React element representing the void element without children
      return React.createElement(node.name);
    }

    // Tag node, process its children
    const processedChildren = node.children.map((child: any) =>
      processNode(child)
    );

    // Return a React element representing the tag with its processed children
    return React.createElement(node.name, null, processedChildren);
  }
};

const determineNodeType = (domNode: any) => {
  const isUnderLinedText =
    domNode.type === "tag" &&
    domNode?.name === "p" &&
    domNode?.children?.length &&
    domNode.children.length === 1;

  const isALink = Boolean(domNode?.attribs?.href);
  const isAQuoteBlock =
    domNode?.attribs?.id === "quote" &&
    domNode?.name === "div" &&
    domNode?.children?.length > 0;

  const isAnInfoBlock =
    domNode?.attribs?.id === "info" &&
    domNode?.name === "div" &&
    domNode?.children?.length > 0;

  const isAVideoEmbed =
    domNode?.attribs?.id === "video" && domNode?.name === "div";

  const isADateStamp =
    domNode.type === "tag" &&
    "attribs" in domNode &&
    domNode.attribs &&
    domNode.attribs.id &&
    domNode.attribs.id === "datestamp";

  const isAnImageTag =
    domNode.type === "tag" &&
    "attribs" in domNode &&
    domNode.attribs &&
    domNode.attribs.id &&
    imagePaths[domNode.attribs.id];

  const isAHorizontalLine =
    domNode.type === "tag" &&
    "attribs" in domNode &&
    domNode.attribs &&
    domNode.attribs.id &&
    domNode.attribs.id === "horizontalLine";

  return {
    isAQuoteBlock,
    isAnImageTag,
    isAVideoEmbed,
    isAHorizontalLine,
    isADateStamp,
    isAnInfoBlock,
    isALink,
    isUnderLinedText,
  };
};

const parserOptions = {
  replace(domNode: any) {
    const {
      isAnImageTag,
      isAQuoteBlock,
      isAVideoEmbed,
      isAHorizontalLine,
      isADateStamp,
      isAnInfoBlock,
      isALink,
    } = determineNodeType(domNode);

    if (isALink && !isAVideoEmbed) {
      return createLinkElement(domNode);
    }

    //Future implementation when I figure out underlining
    // if (isUnderLinedText) {
    //   return <u>{domNode.children[0].data}</u>;
    // }

    if (isAnImageTag) {
      const { path, caption } = imagePaths[domNode.attribs.id];
      return <BlogImage src={path} caption={caption || ""} />;
    } else if (isAQuoteBlock || isAnInfoBlock) {
      const processedChildren = domNode.children.map((child: any) =>
        processNode(child)
      );
      return isAQuoteBlock ? (
        <QuoteContainer>{processedChildren}</QuoteContainer>
      ) : (
        <InfoContainer>{processedChildren}</InfoContainer>
      );
    } else if (isAVideoEmbed) {
      console.log("rendering a video");
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

function removeYouTubePrefix(inputString: string): string {
  // Define a regular expression pattern to match the YouTube URL prefix
  const pattern = /https:\/\/youtu\.be\//;

  // Use the replace() method to replace the matched pattern with an empty string
  const resultString = inputString.replace(pattern, "");

  return resultString;
}

//todo hard code numbers
const BREAKPOINTS = {
  mobile: `${pixelWidths.mobile}px`,
  tablet: `${pixelWidths.tablet}px`,
  desktop: `${pixelWidths.desktop}px`,
};

export {
  processNode,
  determineNodeType,
  imagePaths,
  removeYouTubePrefix,
  colors,
  BREAKPOINTS,
  pixelWidths,
  createLinkElement,
  parserOptions,
};
