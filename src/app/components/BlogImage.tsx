import React from "react";
import Image from "next/image";

type BlogImageProps = {
  src: string;
};

const BlogImage: React.FC<BlogImageProps> = ({ src }) => {
  return <Image src={src} alt="Blog Image" width={500} height={300} />;
};

export default BlogImage;
