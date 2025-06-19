import Image from "next/image";
import styled from "styled-components";

interface HeaderImageProps {
  path: any;
  h1: string;
  h2: string;
  byText: string;
}

const StyledImage = styled.div`
  width: 100%;
  height: 250px;
  filter: brightness(0.6);
  z-index: 1;
  margin-bottom: 20px;
`;

const StyledText = styled.div`
  position: relative;
  top: 210px;
  z-index: 2;
  padding-left: 10px;
`;

const HeaderImage: React.FC<HeaderImageProps> = ({
  path,
  h1 = "",
  h2 = "",
  byText = "",
}) => {
  return (
    <>
      <StyledText>
        <h1>{h1}</h1>
        <h2>{h2}</h2>
        <p>{byText}</p>
      </StyledText>
      <StyledImage>
        <Image src={path} alt="header image" layout="fill" objectFit="cover" />
      </StyledImage>
    </>
  );
};

export default HeaderImage;
