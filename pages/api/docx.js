import path from "path";
import mammoth from "mammoth";
import { JSDOM } from "jsdom";

function processDocx(docxPath) {
  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml({ path: docxPath })
      // .extractRawText({ path: docxPath })
      .then((result) => {
        const rawText = result.value;
        // Process raw text and convert it to HTML
        const convertedHtml = removeFalselyParsedImgTagsRawText(rawText);
        // resolve(convertedHtml);
        let dom = new JSDOM(convertedHtml);
        // console.log({ convertedHtml });
        // resolve(dom.serialize());
        resolve(convertedHtml);
      })
      .catch(reject);
  });
}

function removeFalselyParsedImgTagsRawText(rawText) {
  // Replace HTML entities
  const htmlText = rawText.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  // return `<html><body>${htmlText}</body></html>`;
  return `${htmlText}`;
}

export default async function handler(req, res) {
  const docxPath = path.join(process.cwd(), "public", "SRTest.docx");

  try {
    const html = await processDocx(docxPath);
    // console.log("in handler");
    // console.log({ html });
    res.status(200).json({ html });
  } catch (err) {
    console.log("caught an error", err);
    res.status(500).json({ error: "Error reading .docx file" });
  }
}
