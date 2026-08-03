import fs from "fs";
import path from "path";

import Layout from "./components/Layout";
import StyledBlogEntryPage from "./components/StyledBlogEntryPage";
import ErrorBoundary from "./components/ErrorBoundary";
import DocContent from "./components/DocContent";
import { convertDocxToHtml } from "./lib/docx.mjs";

export default async function Home() {
  const isTesting = false;
  //TODO : maybe pull this doc from google or a CDN, research
  const docToUse = isTesting ? "UnitTest.docx" : "StrangeRipples.docx";
  const docxPath = path.join(process.cwd(), "public", docToUse);
  const buffer = fs.readFileSync(docxPath);
  const cleaned = await convertDocxToHtml({ buffer });
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
