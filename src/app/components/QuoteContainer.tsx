import React from "react";

import styled from "styled-components";

const QuteContainer = styled.div`
  background-color: grey;
  padding: 20px;
  border-radius: 10px;
`;

type QuoteContainerProps = {
  content: string;
};
//different height for mobile vs desktop
const IMAGE_HEIGHT = 400;

const QuoteContainer: React.FC<QuoteContainerProps> = ({ content }) => {
  return <QuteContainer>{content}</QuteContainer>;
};

export default QuoteContainer;
