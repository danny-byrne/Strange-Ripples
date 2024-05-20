"use client";
import styled from "styled-components";
import { layoutDimensions } from "./constants";

const StyledLoadingPage = styled.div`
  height: ${layoutDimensions.loadingPageHeight}vh;
  overflow: hidden;
`;

const LoadingSkeleton = () => {
  const elements = Array.from({ length: 30 }, (_, index) => (
    <div key={index} className="h-4 bg-gray-300 rounded w-7/8 my-2"></div>
  ));

  return (
    <StyledLoadingPage>
      <div className="animate-pulse h-lvh">
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
        {elements}
      </div>
    </StyledLoadingPage>
  );
};

export default LoadingSkeleton;
