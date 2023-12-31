import React from "react";

import styled from "styled-components";

const QuoteContainerStyle = styled.div`
  background-color: grey;
  padding: 20px;
  border-radius: 10px;
`;

const QuoteContainer: React.FC<QuoteContainerProps> = ({ children }) => {
  return <QuoteContainerStyle>{children}</QuoteContainerStyle>;
};

export default QuoteContainer;
