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
    const processedChildren = node.children.map((child) => processNode(child));

    // Return a React element representing the tag
    return React.createElement(node.name, null, processedChildren);
  }
};

const imagePaths: ImageMap = {
  testImage: {
    id: "testImage",
    path: "/images/image1.png",
    caption: "Some text image",
  },
};

const determineNodeType = (domNode: any) => {
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

  return {
    isAQuoteBlock,
    isAnImageTag,
  };
};

export { processNode, determineNodeType, imagePaths };
