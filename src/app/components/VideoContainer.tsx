import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { pixelWidths } from "./utils";

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

const ASPECT_RATIO = 9 / 16;

const VideoContainer: React.FC<BlogVideoProps> = ({
  videoId,
  caption = "",
}) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const videoWidth = viewportWidth * (9 / 10);
  const videoHeight = videoWidth * ASPECT_RATIO;

  const videoWithToUse =
    viewportWidth > pixelWidths.tablet
      ? (9 / 10) * pixelWidths.tablet
      : (9 / 10) * viewportWidth;

  const heightToUse = ASPECT_RATIO * videoWithToUse;

  const opts = {
    width: `${videoWithToUse}`,
    height: `${heightToUse}`,
  };

  return (
    <>
      <p>
        <VideoAndCaptionContainer>
          <VideoCaptionColumn>
            <YouTube opts={opts} videoId={videoId} />
            <Caption>{caption ?? ""}</Caption>
          </VideoCaptionColumn>
        </VideoAndCaptionContainer>
      </p>
    </>
  );
};

export default VideoContainer;
