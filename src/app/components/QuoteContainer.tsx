import React from "react";

import styled from "styled-components";
import { colors } from "./constants";

const generateSharedStyles = (borderPosition = "left") => `
  background-color: ${colors.shadedGrey};
  padding: 2px 20px;
  border-radius: 3px;
  border-${borderPosition}: 5px solid ${colors.shadedGrey};
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

// Use the shared styles for a regular object style

// Use the shared styles for styled-components
const InfoContainerStyle = styled.div`
  ${generateSharedStyles("bottom")}
`;

const QuoteContainerStyle = styled.div`
  ${generateSharedStyles("left")}
`;

// interface QuoteContainerProps {
//   children: React.ReactNode;
// }

const QuoteContainer: React.FC<any> = ({ children }) => {
  return <QuoteContainerStyle>{children}</QuoteContainerStyle>;
};

const InfoContainer: React.FC<any> = ({ children }) => {
  return <InfoContainerStyle>{children}</InfoContainerStyle>;
};

export { QuoteContainer, InfoContainer };
