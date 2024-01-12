"use client";
import dynamic from "next/dynamic";

import styled from "styled-components";
import { colors } from "./components/utils";

const StyledPage = styled.div`
  width: 100vw;
  display: block;
  overflow: auto;
  color: ${colors.darkWhite};

  // display: flex;
  // flex-direction: column;
  // align-items: start;
  // justify-content: center;
  background-color: ${colors.darkGrey};

  padding-left: 550px;
  padding-right: 550px;

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  a {
    text-decoration: underline;
  }

  p {
    margin-top: 20px;
    margin-bottom: 20px;
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
