import React from "react";

import styled from "styled-components";
import { colors } from "./utils";

const QuoteContainerStyle = styled.div`
  background-color: ${colors.shadedGrey};
  padding: 2px 20px;
  border-radius: 3px;
  border-left: 5px solid ${colors.silver};
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

// interface QuoteContainerProps {
//   children: React.ReactNode;
// }

const QuoteContainer: React.FC<any> = ({ children }) => {
  return <QuoteContainerStyle>{children}</QuoteContainerStyle>;
};

export default QuoteContainer;
