import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { JSDOM } from "jsdom";
import { data } from "autoprefixer";

function processDocx(arrayBuffer) {
  // console.log({ arrayBuffer });

  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml({ arrayBuffer: arrayBuffer })
      .then((convertedtoHtml) => {
        console.log({ convertedtoHtml });
      })
      .then(function (result) {
        let html = result.value;
        console.log({ html, arrayBuffer });

        let dom = new JSDOM(html);
        let quoteElements = dom.window.document.getElementsByTagName("quote");
        for (let quoteElement of quoteElements) {
          let blockquote = dom.window.document.createElement("blockquote");
          blockquote.innerHTML = quoteElement.innerHTML;
          quoteElement.parentNode.replaceChild(blockquote, quoteElement);
        }

        let textNodes = dom.window.document.body.childNodes;
        for (let textNode of textNodes) {
          if (textNode.nodeType === dom.window.Node.TEXT_NODE) {
            let paragraphs = textNode.textContent.split("\n\n");
            for (let i = 0; i < paragraphs.length - 1; i++) {
              let p = dom.window.document.createElement("p");
              p.textContent = paragraphs[i];
              dom.window.document.body.insertBefore(p, textNode);
            }
            textNode.textContent = paragraphs[paragraphs.length - 1];
          }
        }

        resolve(dom.serialize());
      })
      .catch(reject);
  });
}

export default async function handler(req, res) {
  const docxPath = path.join(process.cwd(), "public", "StrangeRipples.docx");
  // console.log({ docxPath });
  // const docxPath = path.resolve(process.cwd(), 'public/StrangeRipples.docx');

  const data = fs.readFileSync(docxPath);

  const arrayBuffer = Uint8Array.from(data).buffer;

  try {
    const html = await processDocx(arrayBuffer);
    res.status(200).json({ html });
  } catch (err) {
    console.log("caught an error", err);
    res.status(500).json({ error: "Error reading .docx file" });
  }

  // const arrayBuffer = fs.readFileSync(docxPath).buffer;
  // console.log({html})
}
