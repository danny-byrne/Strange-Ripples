import React from "react";

import styled from "styled-components";

const QuoteContainerStyle = styled.div`
  background-color: grey;
  padding: 20px;
  border-radius: 10px;
`;

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

const voidElementNames = [
  "area",
  "base",
  "br",
  "col" /* ... other void element names ... */,
];

//i feel like this should be in
const convertToReactElement = (element: Element): JSX.Element => {
  // Recursive function to convert Element to React element
  const convertChild = (child: Element, index: number): JSX.Element => {
    if (child.type === "text") {
      return <span key={index}>{child.data}</span>;
    }

    // Check if the child is a void element
    const isVoidElement = voidElementNames.includes(child.name);

    return React.createElement(
      isVoidElement ? child.name : "div",
      { key: index, ...child.attribs },
      !isVoidElement &&
        child.children &&
        child.children.map((nestedChild, nestedIndex) =>
          convertChild(nestedChild, nestedIndex)
        )
    );
  };

  const dynamicProps = { ...element.attribs, key: element.startIndex };

  // Check if the element is a void element
  const isVoidElement = voidElementNames.includes(element.name);

  if (!element.name) {
    console.error("Undefined element name:", element);
    return <div>Error: Undefined element name</div>;
  }

  // For void elements, skip rendering children
  if (isVoidElement) {
    return React.createElement(element.name, dynamicProps);
  }

  return React.createElement(
    element.name,
    dynamicProps,
    !isVoidElement &&
      element.children &&
      element.children.map((child, index) => convertChild(child, index))
  );
};

const QuoteContainer: React.FC<QuoteContainerProps> = ({ content }) => {
  const renderContent = () => {
    // Convert each DOM node to a React element
    return content.map((element, index) => convertToReactElement(element));
  };

  const renderedContent = renderContent();

  return <QuoteContainerStyle>{renderedContent}</QuoteContainerStyle>;
};

export default QuoteContainer;
