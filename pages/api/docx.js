import path from "path";
import mammoth from "mammoth";
import { JSDOM } from "jsdom";

function processDocx(docxPath) {
  return new Promise((resolve, reject) => {
    mammoth
      .convertToHtml({ path: docxPath })
      .then((result) => {
        let html = result.value;
        console.log({ html });

        let dom = new JSDOM(html);

        console.log({ dom });

        resolve(dom.serialize());
      })
      .catch(reject);
  });
}

export default async function handler(req, res) {
  const docxPath = path.join(
    process.cwd(),
    "public",
    "StrangeRipplesTest.docx"
  );

  try {
    const html = await processDocx(docxPath);
    console.log("in handler");
    console.log({ html });
    res.status(200).json({ html });
  } catch (err) {
    console.log("caught an error", err);
    res.status(500).json({ error: "Error reading .docx file" });
  }
}
