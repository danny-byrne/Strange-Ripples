import fs from "fs";
import path from "path";
import mammoth from "mammoth";

import Layout from "./components/Layout";
import StyledBlogEntryPage from "./components/StyledBlogEntryPage";
import ErrorBoundary from "./components/ErrorBoundary";
import DocContent from "./components/DocContent";
import TestBox from "./components/TestBox";

function removeFalselyParsedImgTagsRawText(rawText: string): string {
  return (
    rawText
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      // remove <p> wrappers around block elements like <div> and <img>
      .replace(/<p>(<div[\s\S]*?<\/div>)<\/p>/g, "$1")
      .replace(/<p>(<img[\s\S]*?\/?>)<\/p>/g, "$1")
  );
}

export default async function Home() {
  const isTesting = false;
  //TODO : maybe pull this doc from google or a CDN, research
  const docToUse = isTesting ? "UnitTest.docx" : "StrangeRipples.docx";
  const docxPath = path.join(process.cwd(), "public", docToUse);
  const buffer = fs.readFileSync(docxPath);
  const { value: rawText } = await mammoth.convertToHtml({ buffer });
  const cleaned = removeFalselyParsedImgTagsRawText(rawText);

  return (
    <Layout>
      <ErrorBoundary>
        <StyledBlogEntryPage>
          <DocContent html={cleaned} />
        </StyledBlogEntryPage>
      </ErrorBoundary>
    </Layout>
  );
}
