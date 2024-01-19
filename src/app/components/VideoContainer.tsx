import React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { pixelWidths } from "./utils";
import { useWindowSize } from "../hooks/useWindowSize";

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
  const { windowSize } = useWindowSize();

  const { width } = windowSize;

  const videoWithToUse =
    width > pixelWidths.tablet
      ? (9 / 10) * pixelWidths.tablet
      : (9 / 10) * width;

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
