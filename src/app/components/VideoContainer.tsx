import React from "react";
import Image from "next/image";
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
//different height for mobile vs desktop
const IMAGE_HEIGHT = 400;

const VideoContainer: React.FC<BlogVideoProps> = ({
  videoId,
  caption = "",
}) => {
  return (
    <>
      <p>
        <VideoAndCaptionContainer>
          <VideoCaptionColumn>
            <YouTube videoId={videoId} />
            <Caption>{caption ?? ""}</Caption>
          </VideoCaptionColumn>
        </VideoAndCaptionContainer>
      </p>
    </>
  );
};

export default VideoContainer;
