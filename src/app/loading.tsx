"use client";
import styled from "styled-components";

const StyledLoadingPage = styled.div`
  height: 100vh;
`;

const LoadingSkeleton = () => {
  const elements = Array(30).fill(
    <div className="h-4 bg-gray-300 rounded w-3/4 my-2"></div>
  );

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
