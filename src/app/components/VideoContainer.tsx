import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const VideoAndCaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const VideoCaptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Caption = styled.div`
  font-size: 0.8rem;
  font-style: italic;
`;

type BlogVideoProps = {
  videoId: string;
  caption?: string;
};

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

const ASPECT_RATIO = 9 / 16;

const VideoContainer: React.FC<BlogVideoProps> = ({
  videoId,
  caption = "",
}) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update viewport width on resize
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const videoWidth = viewportWidth * (9 / 10);
  const videoHeight = videoWidth * ASPECT_RATIO;

  const videoWithToUse =
    viewportWidth > BREAKPOINTS.tablet
      ? (9 / 10) * BREAKPOINTS.tablet
      : (9 / 10) * viewportWidth;

  const heightToUse = ASPECT_RATIO * videoWithToUse;

  const opts = {
    width: `${videoWithToUse}`,
    // height: "390",
    height: `${heightToUse}`,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      <p>
        <VideoAndCaptionContainer>
          <VideoCaptionColumn>
            <YouTube opts={opts} videoId={videoId} />
            <p>Viewport Width: {viewportWidth}px</p>
            <Caption>{caption ?? ""}</Caption>
          </VideoCaptionColumn>
        </VideoAndCaptionContainer>
      </p>
    </>
  );
};

export default VideoContainer;
