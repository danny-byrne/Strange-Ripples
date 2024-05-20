//https://calcolor.co/palette/942409461
const colors = {
  darkGrey: "#555555",
  silver: "#bbbbbb",
  shadedWhite: "#dddddd",
  darkWhite: "#cccccc",
  shadedGrey: "#666666",
};

const layoutDimensions = {
  pageHeight: 100,
  topBarHeight: 8,
  loadingPageHeight: 0,
};

layoutDimensions.loadingPageHeight =
  layoutDimensions.pageHeight - layoutDimensions.topBarHeight;

const pixelWidths = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

type ImageMap = {
  [key: string]: { id: string; path: string; caption?: string };
};

const imagePaths: ImageMap = {
  testImage: {
    id: "testImage",
    path: "/images/image1.png",
    caption: "Some text image",
  },
  carlJungBookImage: {
    id: "carlJungBookImage",
    path: "/images/CarlJungBook.png",
    caption: "Carl Jung explored why UFOs are commonly encountered in dreams",
  },
  magonia: {
    id: "magonia",
    path: "/images/Magonia.png",
    caption:
      "Jacques Valle wrote Passport to Magonia, in which he explored the UFO phenomenon in relation to human consciousness and psychology",
  },
  hynekVallee: {
    id: "hynekVallee",
    path: "/images/HynekVallee.png",
    caption:
      "J. Allen Hynek (1910–1986) was an American astronomer, professor, and ufologist. He is best known for his work as the scientific consultant for the U.S. Air Force's Project Blue Book, which investigated UFO sightings. Initially a skeptic, Hynek eventually became a prominent figure in the study of unidentified flying objects and introduced the classification system for close encounters. Jacques Vallée (born 1939) is a French computer scientist, ufologist, and author. Vallée is known for his research on unidentified flying objects and is a proponent of the extraterrestrial hypothesis. He has also explored alternative theories, including the idea that UFOs are interdimensional or time-traveling phenomena. Vallée's work has contributed significantly to the study of UFO phenomena and the paranormal.",
  },
};

export { colors, pixelWidths, imagePaths, layoutDimensions };
