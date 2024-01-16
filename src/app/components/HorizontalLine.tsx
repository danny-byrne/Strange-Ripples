import React from "react";
import styled from "styled-components";

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
`;

const HorizontalLine: React.FC = () => {
  return <Line />;
};

export default HorizontalLine;
