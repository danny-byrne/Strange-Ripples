"use client";

import styled from "styled-components";
import { colors, BREAKPOINTS } from "./utils";

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

export default StyledBlogEntryPage;
