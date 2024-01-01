import React from "react";

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

const processNode = (node: any) => {
  if (node.type === "text") {
    // Text node, just return the text
    return node.data;
  } else if (node.type === "tag") {
    // Tag node, process its children
    const processedChildren = node.children.map((child: any) =>
      processNode(child)
    );

    // Return a React element representing the tag
    return React.createElement(node.name, null, processedChildren);
  }
};

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

const determineNodeType = (domNode: any) => {
  // console.log({ domNode });
  const isAQuoteBlock =
    domNode?.attribs?.id === "quote" &&
    domNode?.name === "div" &&
    domNode?.children?.length > 0;

  const isAVideoEmbed =
    domNode?.attribs?.id === "video" && domNode?.name === "div";

  const isAnImageTag =
    domNode.type === "tag" &&
    "attribs" in domNode &&
    domNode.attribs &&
    domNode.attribs.id &&
    imagePaths[domNode.attribs.id];

  return {
    isAQuoteBlock,
    isAnImageTag,
    isAVideoEmbed,
  };
};

function removeYouTubePrefix(inputString: string): string {
  // Define a regular expression pattern to match the YouTube URL prefix
  const pattern = /https:\/\/youtu\.be\//;
  console.log({ inputString });
  // Use the replace() method to replace the matched pattern with an empty string
  const resultString = inputString.replace(pattern, "");

  return resultString;
}

export { processNode, determineNodeType, imagePaths, removeYouTubePrefix };
