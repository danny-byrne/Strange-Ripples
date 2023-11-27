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
