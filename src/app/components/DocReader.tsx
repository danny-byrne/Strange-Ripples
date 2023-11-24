import React, { useEffect, useState } from "react";
import parse, { DOMNode, domToReact } from "html-react-parser";
import BlogImage from "./BlogImage";

type ImageMap = {
  [key: string]: { id: string; path: string; subcaption?: string };
};

const imagePaths: ImageMap = {
  carlJung: { id: "carlJung", path: "https://i.imgur.com/4QZKX0M.png" },
  carlJungBookImage: {
    id: "carlBookImage",
    path: "https://i.imgur.com/4QZKX0M.png",
  },
  ayaUFOs: { id: "ayaUFOs", path: "/images/ayaUFOs.png", subcaption: "" },
};

const DocxReader: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    console.log("htmlContent: ", htmlContent);
  }, [htmlContent]);

  useEffect(() => {
    fetch("/api/docx")
      .then((response) => response.json())
      .then((data) => {
        setHtmlContent(data.html);
      })
      .catch((err) => console.error(err));
  }, []);

  const replaceDOM = (
    reactNode: string | React.ReactElement,
    domNode: any,
    index: number
  ): React.ReactElement | null => {
    if (
      domNode.type === "tag" &&
      domNode.name === "p" &&
      domNode.children?.[0]?.data
    ) {
      const key = domNode.children[0].data;
      if (key in imagePaths) {
        return <div id={imagePaths[key as keyof typeof imagePaths].id}></div>;
      }
    }
    return null; // Returning null when you don't want to replace anything
  };

  const replaceDOMTwo = (
    reactNode: string | React.ReactElement,
    domNode: any,
    index: number
  ) => {
    if (domNode.name === "p") {
      for (let key in imagePaths) {
        if (domNode.children[0].data === `<${key}>`) {
          return <div id={imagePaths[key].id}></div>;
        }
      }
    }
  };

  //TODONEXT: figure out parse with obj.transform as second arg

  // const content = parse(htmlContent, { transform: replaceDOM });

  // const options = {
  //   replace({ attribs, children }: { attribs: any; children: any[] }) {
  //     if (!attribs) {
  //       return;
  //     }

  //     if (attribs.id) {
  //       // return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
  //       console.log('id: ', attribs.id);
  //     }

  //     // if (attribs.id === 'main') {
  //     //   return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
  //     // }

  //     // if (attribs.class === 'prettify') {
  //     //   return (
  //     //     <span style={{ color: 'hotpink' }}>
  //     //       {domToReact(children, options)}
  //     //     </span>
  //     //   );
  //     // }
  //   },
  // };

  const options = {
    replace(
      domNode: DOMNode
    ): false | void | object | Element | null | undefined {
      if (
        domNode.type === "tag" &&
        "attribs" in domNode &&
        domNode.attribs &&
        domNode.attribs.id &&
        imagePaths[domNode.attribs.id]
      ) {
        console.log("id: ", domNode.attribs.id);
        // return <img src={imagePaths[domNode.attribs.id].path} />;
        return <BlogImage src={imagePaths[domNode.attribs.id].path} />;
      }
    },
  };

  //todo, create image component with caption

  const content = parse(htmlContent, options);
  console.log({ content });

  return (
    <>
      {/* <div id="test class">Hello</div> */}
      {/* <div id="test class" dangerouslySetInnerHTML={{ __html: content }} /> */}
      <div id="test class">{content}</div>
    </>
  );
};

export default DocxReader;
