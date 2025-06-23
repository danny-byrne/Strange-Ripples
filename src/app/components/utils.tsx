"use client";
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

const processNode = (node: any, index: number) => {
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
      return React.createElement(node.name, { key: index });
    }

    // Tag node, process its children
    const processedChildren = node.children.map(
      (child: any, childIndex: number) => processNode(child, childIndex)
    );

    // Return a React element representing the tag with its processed children
    return React.createElement(node.name, { key: index }, processedChildren);
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
    // console.log({ domNode });
    if (
      domNode.type === "tag" &&
      domNode.name === "div" &&
      domNode.parent &&
      domNode.parent.name === "p"
    ) {
      return (
        <span key={Math.random()}>
          {domNode.children?.map((child: any, index: number) =>
            processNode(child, index)
          )}
        </span>
      );
    }
    const {
      isAnImageTag,
      isAQuoteBlock,
      isAVideoEmbed,
      isAHorizontalLine,
      isADateStamp,
      isAnInfoBlock,
      isALink,
    } = determineNodeType(domNode);

    isAnInfoBlock && console.log({ isAnInfoBlock, domNode });

    // console.log({
    //   isAnImageTag,
    //   isAQuoteBlock,
    //   isAVideoEmbed,
    //   isAHorizontalLine,
    //   isADateStamp,
    //   isAnInfoBlock,
    //   isALink,
    // });

    if (isALink && !isAVideoEmbed) {
      return createLinkElement(domNode);
    }

    if (isAnImageTag) {
      const { path, caption } = imagePaths[domNode.attribs.id];

      return (
        <div key={Math.random()}>
          <BlogImage src={path} caption={caption || ""} />;
        </div>
      );
    } else if (isAQuoteBlock || isAnInfoBlock) {
      const processedChildren = domNode.children.map(
        (child: any, index: number) => processNode(child, index)
      );
      return isAQuoteBlock ? (
        <QuoteContainer key={domNode.attribs.key || Math.random()}>
          {processedChildren}
        </QuoteContainer>
      ) : (
        <InfoContainer key={domNode.attribs.key || Math.random()}>
          {processedChildren}
        </InfoContainer>
      );
    } else if (isAVideoEmbed) {
      const href = domNode?.attribs?.href;
      const videoId = removeYouTubePrefix(href);
      return (
        <VideoContainer
          key={domNode.attribs.key || Math.random()}
          videoId={videoId}
        />
      );
    } else if (isAHorizontalLine) {
      return <HorizontalLine key={domNode.attribs.key || Math.random()} />;
    } else if (isADateStamp) {
      return <div className="datestamp">Published June 9th 2024</div>;
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
