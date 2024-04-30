import Image from "next/image";

interface HeaderImageProps {
  path: any;
  h1: string;
  h2: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({
  path,
  h1 = "",
  h2 = "",
}) => {
  return <Image src={path} alt="header image" height={500} width={500} />;
};

export default HeaderImage;
