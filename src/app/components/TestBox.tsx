// components/TestBox.tsx
"use client";
import styled from "styled-components";

const Box = styled.div`
  background: purple;
  color: white;
  padding: 2rem;
`;

export default function TestBox() {
  return <Box>Test styled-component</Box>;
}
