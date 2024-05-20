"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import styled from "styled-components";
import { colors, BREAKPOINTS } from "./components/utils";
import Layout from "./components/Layout";
import About from "./components/About";
import HeaderImage from "./components/HeaderImage";
import ErrorBoundary from "./components/ErrorBoundary";
import Loading from "./components/Loading";

const StyledBlogEntryPage = styled.div`
  width: 100vw;
  display: block;
  overflow: auto;
  color: ${colors.darkWhite};
  background-color: ${colors.darkGrey};
  padding-top: 1rem;
  padding-left: 10%;
  padding-right: 10%;
  // transition: all 2s linear;

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

  // p:nth-of-type(8)::first-letter {
  //   font-size: 200%;
  //   margin-right: 1px;
  // }
`;

import UFOImagePath from "/public/images/UFO.jpg";
// const UFOImagePath = "/public/images/UFO.jpg";
//
export default function Home() {
  const DocxReader = dynamic(() => import("./components/DocReader"), {
    ssr: false,
  });

  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <ErrorBoundary>
        <StyledBlogEntryPage>
          {/* <HeaderImage
                path={UFOImagePath}
                h1="Strange Ripples"
                h2="The Bizarre Relationship Between Psychedelics and Dreams, Part I"
                byText="By Danny Byrne"
              /> */}
          <DocxReader setLoading={setLoading} />

          {loading ? <Loading /> : <About />}
        </StyledBlogEntryPage>
      </ErrorBoundary>
    </Layout>
  );
}
