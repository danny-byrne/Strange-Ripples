"use client";
import dynamic from "next/dynamic";

import styled from "styled-components";

const StyledPage = styled.div`
  width: 100vw;
  display: block;
  overflow: auto;

  // display: flex;
  // flex-direction: column;
  // align-items: start;
  // justify-content: center;
  background-color: blue;

  padding-left: 100px;
  padding-right: 100px;

  h1 {
    color: red;
    font-size: 3rem;
  }

  h2 {
    color: green;
    font-size: 2rem;
  }

  a {
    text-decoration: underline;
  }

  p {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
  }
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
