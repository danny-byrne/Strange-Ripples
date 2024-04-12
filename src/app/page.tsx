"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { colors, BREAKPOINTS } from "./components/utils";
import Layout from "./components/Layout";
import About from "./components/About";
// import headerImage from "../../public/images/Dream1.png";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState } from "react";

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

const StyledHeaderImage = styled.div`
  position: absolute;
  top: 100;
  height: 200px;
  overflow: hidden;
`;

export default function Home() {
  const DocxReader = dynamic(() => import("./components/DocReader"), {
    ssr: false,
  });

  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <ErrorBoundary>
        <StyledBlogEntryPage>
          {/* <ErrorBoundary> */}
          {/* fix Suspense */}
          <Suspense fallback={"Loading.."}>
            <DocxReader setLoading={setLoading} />
          </Suspense>
          {/* </ErrorBoundary> */}
          {!loading && <About />}
        </StyledBlogEntryPage>
      </ErrorBoundary>
    </Layout>
  );
}
