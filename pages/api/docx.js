import path from "path";
import { convertDocxToHtml } from "../../src/app/lib/docx.mjs";

//TODO: fetch the foc grom my google drive
// https://chat.openai.com/share/332e9201-dc39-4962-aea3-7c1f66ed8b34

export default async function handler(req, res) {
  const isTesting = true;
  const docToUse = isTesting ? "UnitTest.docx" : "StrangeRipples.docx";
  const docxPath = path.join(process.cwd(), "public", docToUse);

  try {
    const html = await convertDocxToHtml({ path: docxPath });
    res.status(200).json({ html });
  } catch (err) {
    console.log("caught an error", err);
    res.status(500).json({ error: "Error reading .docx file" });
  }
}
