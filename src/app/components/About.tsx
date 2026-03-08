"use client";

import React from "react";
import Image from "next/image";
import DannyImage from "../../../public/images/Danny.jpg";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.aboutContentContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={DannyImage}
          alt=""
          fill
          sizes="180px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.verticalLine} />

      <div className={styles.bioContainer}>
        <h2>About the Author</h2>
        <div className={styles.text}>
          Danny Byrne is a software engineer and musician. This is the first
          chapter of a book about his experiences facilitating groups with
          Ayahuasca and Psilocybin mushrooms. He creates meditative ceremony
          music as <a href="https://harmala.bandcamp.com">Harmala</a>, and the
          co-founder of{" "}
          <a href="https://www.harmalatemple.com">Harmala Temple</a>, a
          psychedelic church. He lives in Southern California with his wife and
          daughter. You can find Aya Dreams Project on instagram at{" "}
          <a href="https://www.instagram.com/ayadreamsproject/">
            @ayadreamsproject
          </a>{" "}
          and follow musical happenings at{" "}
          <a href="https://www.instagram.com/harmala.music/">@harmala.music</a>.
        </div>
      </div>
    </div>
  );
};

export default About;
