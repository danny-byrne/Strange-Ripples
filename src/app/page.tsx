"use client";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { colors } from "./components/utils";

const BREAKPOINTS = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1280px",
};

const StyledBlogEntryPage = styled.div`
  width: 100vw;
  display: block;
  overflow: auto;
  color: ${colors.darkWhite};
  background-color: ${colors.darkGrey};

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

// import headerImage from "../../public/images/Dream1.png";
import ErrorBoundary from "./components/ErrorBoundary";

export default function Home() {
  const DocxReader = dynamic(() => import("./components/DocReader"), {
    ssr: false,
  });

  // const innerWidth = window.innerWidth;

  return (
    <div className="test">
      {/* future implemenation} */}
      {/* <StyledHeaderImage>
        <Image
          src={headerImage}
          width={innerWidth}
          // height={200}
          alt="Picture of the author"
        />
      </StyledHeaderImage> */}
      <ErrorBoundary>
        <StyledBlogEntryPage>
          <ErrorBoundary>
            <DocxReader />
          </ErrorBoundary>
        </StyledBlogEntryPage>
      </ErrorBoundary>
    </div>
  );
}
