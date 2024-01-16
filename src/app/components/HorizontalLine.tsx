import React from "react";
import styled from "styled-components";
import { colors } from "./utils";

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.silver};
`;

const HorizontalLine: React.FC = () => {
  return <Line />;
};

export default HorizontalLine;
