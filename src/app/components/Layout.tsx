"use client";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors, BREAKPOINTS } from "./utils";
import HorizontalLine from "./HorizontalLine";
import { layoutDimensions } from "./constants";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  height: ${layoutDimensions.topBarHeight}vh;
  background-color: ${colors.darkGrey};
  color: ${colors.darkWhite};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1.2rem;

  h1 {
    font-size: 1.2rem;
    @media (min-width: ${BREAKPOINTS.mobile}) {
      font-size: 2rem;
    }
  }
`;

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <LayoutWrapper>
      <TopBar>
        <h1 className="hello">Aya Dreams Project</h1>
      </TopBar>
      <HorizontalLine />
      {props.children}
    </LayoutWrapper>
  );
};

export default Layout;
