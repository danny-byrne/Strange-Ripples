import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import parse from "html-react-parser";

import styled from "styled-components";
import { colors, BREAKPOINTS, parserOptions } from "./components/utils";
import Layout from "./components/Layout";
import About from "./components/About";
import ErrorBoundary from "./components/ErrorBoundary";

const StyledBlogEntryPage = styled.div`
  width: 100vw;
  display: block;
  overflow: auto;
  color: ${colors.darkWhite};
  background-color: ${colors.darkGrey};
  padding-top: 1rem;
  padding-left: 10%;
  padding-right: 10%;

  @media (min-width: ${BREAKPOINTS.mobile}) {
    padding-left: 20%;
    padding-right: 20%;
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding-left: 25%;
    padding-right: 25%;
  }

  h1 {
    font-size: 2rem;
    @media (min-width: ${BREAKPOINTS.mobile}) {
      font-size: 3rem;
    }
  }

  h2 {
    font-size: 1.3rem;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
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

function removeFalselyParsedImgTagsRawText(rawText: string): string {
  return rawText.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export default async function Home() {
  const docxPath = path.join(process.cwd(), "public", "StrangeRipples.docx");
  const buffer = fs.readFileSync(docxPath);
  const { value: rawText } = await mammoth.convertToHtml({ buffer });
  const cleaned = removeFalselyParsedImgTagsRawText(rawText);
  const content = parse(cleaned, parserOptions);

  return (
    <Layout>
      <ErrorBoundary>
        <StyledBlogEntryPage>
          {content}
          <About />
        </StyledBlogEntryPage>
      </ErrorBoundary>
    </Layout>
  );
}
