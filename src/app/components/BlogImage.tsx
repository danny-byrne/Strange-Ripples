import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ImageAndCaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ImageCaptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ImageCaption = styled.div`
  font-size: 0.8rem;
  font-style: italic;
`;

type BlogImageProps = {
  src: string;
  caption: string;
};
//different height for mobile vs desktop
const IMAGE_HEIGHT = 500;

const BlogImage: React.FC<BlogImageProps> = ({ src, caption }) => {
  return (
    <ImageAndCaptionContainer>
      <ImageCaptionColumn>
        <Image
          src={src}
          alt="Blog Image"
          width={IMAGE_HEIGHT}
          height={IMAGE_HEIGHT}
        />
        <ImageCaption>{caption ?? ""}</ImageCaption>
      </ImageCaptionColumn>
    </ImageAndCaptionContainer>
  );
};

export default BlogImage;
