import React from "react";
import Image from "next/image";
import styled from "styled-components";

import DannyImage from "../../../public/images/Danny.jpg";

const dimensions = 200;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1.2rem;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <h2>About the Author</h2>
      <Image
        src={DannyImage}
        alt=""
        width={dimensions}
        style={{ borderRadius: 200 }}
      />
      <div>
        Danny Byrne is a software engineer and musician. He is currently working
        on a book about his experiences with Ayahuasca and Psilocybin mushrooms.
        He creates meditative ceremony music as
        <a href="harmala.bandcamp.com">Harmala</a>. He lives in Southern
        California with his wife and daughter.
      </div>
    </AboutContainer>
  );
};

export default About;
