"use client";
import React from "react";
import styled from "styled-components";
import { colors } from "./constants";

// Todo: enforce this
// type Element = {
//   attribs: Record<string, any>;
//   children: Element[];
//   endIndex: null | number;
//   name: string;
//   next: Element | null;
//   parent: Element | null;
//   prev: Element | null;
//   startIndex: null | number;
//   type: string;
//   data: string;
// };

// type QuoteContainerProps = {
//   content: Element[];
// };

const generateSharedStyles = (borderPosition = "left") => `
  background-color: ${colors.shadedGrey};
  // background-color: red;
  padding: 2px 20px;
  border-radius: 3px;
  border-${borderPosition}: 5px solid ${colors.darkWhite};
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  // background-color: magenta !important;
  // border: 3px solid lime !important;
  // font-size: 2rem !important;
`;

const InfoContainerStyle = styled.div`
  ${generateSharedStyles("bottom")}
`;

const QuoteContainerStyle = styled.div`
  ${generateSharedStyles("left")}
`;

const QuoteContainer: React.FC<any> = ({ children }) => {
  return <QuoteContainerStyle>{children}</QuoteContainerStyle>;
};

const InfoContainer: React.FC<any> = ({ children }) => {
  return <InfoContainerStyle>{children}</InfoContainerStyle>;
};

export { QuoteContainer, InfoContainer };
