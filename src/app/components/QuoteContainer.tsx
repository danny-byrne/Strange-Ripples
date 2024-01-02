import React from "react";

import styled from "styled-components";
import { colors } from "./utils";

const QuoteContainerStyle = styled.div`
  background-color: ${colors.shadedGrey};
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const QuoteContainer: React.FC<QuoteContainerProps> = ({ children }) => {
  return <QuoteContainerStyle>{children}</QuoteContainerStyle>;
};

export default QuoteContainer;
