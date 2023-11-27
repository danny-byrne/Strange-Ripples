import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ImageAndCaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageCaption = styled.div`
  font-size: 0.8rem;
  font-style: italic;
`;

type BlogImageProps = {
  src: string;
  caption: string;
};

const IMAGE_HEIGHT = 200;

const BlogImage: React.FC<BlogImageProps> = ({ src, caption }) => {
  return (
    <ImageAndCaptionContainer>
      <Image
        src={src}
        alt="Blog Image"
        width={IMAGE_HEIGHT}
        height={IMAGE_HEIGHT}
      />
      <ImageCaption>{caption ?? ""}</ImageCaption>
    </ImageAndCaptionContainer>
  );
};

export default BlogImage;
