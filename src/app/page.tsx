"use client";
import dynamic from "next/dynamic";

import styled from "styled-components";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: blue;
  height: 100vh;
`;

export default function Home() {
  const DocxReader = dynamic(() => import("./components/DocReader"), {
    ssr: false,
  });
  return (
    <div className="test">
      <StyledPage>
        <DocxReader />
      </StyledPage>
    </div>
  );
}
