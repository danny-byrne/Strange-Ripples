import React from "react";
import Image from "next/image";
import styled from "styled-components";

import DannyImage from "../../../public/images/Danny.jpg";
import { BREAKPOINTS, colors } from "./utils";

const dimensions = 1;

const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  height: 270px;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
  width: 60%;
  // height: 600px;

  h2 {
    font-size: 1.2rem;
  }
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 90%;
  background-color: ${colors.silver};
`;

const Text = styled.div`
  display: block;
  font-size: 0.8rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 30%;

  @media (min-width: ${BREAKPOINTS.tablet}) {
    width: 20%;
  }
`;

const About: React.FC = () => {
  return (
    <ContentRow>
      <ImageWrapper>
        <Image src={DannyImage} alt="" style={{ borderRadius: "6rem" }} />
      </ImageWrapper>

      <VerticalLine />
      <AboutContainer>
        <h2>About the Author</h2>
        <Text>
          Danny Byrne is a software engineer and musician. He is currently
          writing book about his experiences with Ayahuasca and Psilocybin
          mushrooms. He creates meditative ceremony music as{" "}
          <a href="harmala.bandcamp.com">Harmala</a>. He lives in Southern
          California with his wife and daughter. You can find him on instagram
          at @ayadreamsproject.
        </Text>
      </AboutContainer>
    </ContentRow>
  );
};

export default About;
