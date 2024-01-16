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

const voidElements = ["br" /* add other void elements here */];

const processNode = (node: any) => {
  if (node.type === "text") {
    // Text node, just return the text
    return node.data;
  } else if (node.type === "tag") {
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

type ImageMap = {
  [key: string]: { id: string; path: string; caption?: string };
};

const imagePaths: ImageMap = {
  testImage: {
    id: "testImage",
    path: "/images/image1.png",
    caption: "Some text image",
  },
  carlJungBookImage: {
    id: "carlJungBookImage",
    path: "/images/CarlJungBook.png",
    caption: "Carl Jung explored why UFOs are commonly encountered in dreams",
  },
  magonia: {
    id: "magonia",
    path: "/images/Magonia.png",
    caption:
      "Jacques Valle wrote Passport to Magonia, in which he explored the UFO phenomenon in relation to human consciousness and pschology",
  },
  hynekVallee: {
    id: "hynekVallee",
    path: "/images/HynekVallee.png",
    caption:
      "J. Allen Hynek and Jacques Vallee were both astronomers who became interested in UFOs",
  },
};

const determineNodeType = (domNode: any) => {
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
  };
};

function removeYouTubePrefix(inputString: string): string {
  // Define a regular expression pattern to match the YouTube URL prefix
  const pattern = /https:\/\/youtu\.be\//;

  // Use the replace() method to replace the matched pattern with an empty string
  const resultString = inputString.replace(pattern, "");

  return resultString;
}
//https://calcolor.co/palette/942409461
const colors = {
  darkGrey: "#555555",
  silver: "#bbbbbb",
  shadedWhite: "#dddddd",
  darkWhite: "#cccccc",
  shadedGrey: "#666666",
};

//todo hard code numbers
const BREAKPOINTS = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1280px",
};

export {
  processNode,
  determineNodeType,
  imagePaths,
  removeYouTubePrefix,
  colors,
  BREAKPOINTS,
};
