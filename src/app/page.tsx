import fs from "fs";
import path from "path";
import mammoth from "mammoth";

import Layout from "./components/Layout";
import About from "./components/About";
import StyledBlogEntryPage from "./components/StyledBlogEntryPage";
import ErrorBoundary from "./components/ErrorBoundary";
import DocContent from "./components/DocContent";

function removeFalselyParsedImgTagsRawText(rawText: string): string {
  return rawText.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export default async function Home() {
  const docxPath = path.join(process.cwd(), "public", "StrangeRipples.docx");
  const buffer = fs.readFileSync(docxPath);
  const { value: rawText } = await mammoth.convertToHtml({ buffer });
  const cleaned = removeFalselyParsedImgTagsRawText(rawText);

  return (
    <Layout>
      <ErrorBoundary>
        <StyledBlogEntryPage>
          <DocContent html={cleaned} />
          <About />
        </StyledBlogEntryPage>
      </ErrorBoundary>
    </Layout>
  );
}
