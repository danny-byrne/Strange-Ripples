import React from "react";
import styled from "styled-components";
import { colors } from "./constants";

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.darkWhite};
`;

const HorizontalLine: React.FC = () => {
  return <Line />;
};

export default HorizontalLine;
