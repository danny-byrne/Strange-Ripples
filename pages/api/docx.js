import path from "path";
import mammoth from "mammoth";
import { JSDOM } from "jsdom";

//TODO: fetch the foc grom my google drive
// https://chat.openai.com/share/332e9201-dc39-4962-aea3-7c1f66ed8b34

function processDocx(docxPath) {
  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml({ path: docxPath })
      .then((result) => {
        const rawText = result.value;
        // Process raw text and convert it to HTML
        const convertedHtml = removeFalselyParsedImgTagsRawText(rawText);

        let dom = new JSDOM(convertedHtml);

        resolve(convertedHtml);
      })
      .catch(reject);
  });
}

function removeFalselyParsedImgTagsRawText(rawText) {
  // Replace HTML entities
  const htmlText = rawText.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

  return `${htmlText}`;
}

export default async function handler(req, res) {
  const isTesting = true;
  const docToUse = isTesting ? "UnitTest.docx" : "StrangeRipples.docx";
  const docxPath = path.join(process.cwd(), "public", docToUse);

  try {
    const html = await processDocx(docxPath);
    res.status(200).json({ html });
  } catch (err) {
    console.log("caught an error", err);
    res.status(500).json({ error: "Error reading .docx file" });
  }
}
