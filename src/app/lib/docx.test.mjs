import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { cleanMammothHtml, convertDocxToHtml } from "./docx.mjs";

test("decodes an inline custom block and removes its paragraph wrapper", () => {
  const raw = "<p>&lt;div id=quote&gt;A quote&lt;/div&gt;</p>";

  assert.equal(cleanMammothHtml(raw), "<div id=quote>A quote</div>");
});

test("normalizes a custom block that spans Word paragraphs", () => {
  const raw = [
    "<p>&lt;div id=info&gt;</p>",
    "<p><strong>Note:</strong> Keep this paragraph.</p>",
    "<p>&lt;/div&gt;</p>",
  ].join("");

  assert.equal(
    cleanMammothHtml(raw),
    "<div id=info><p><strong>Note:</strong> Keep this paragraph.</p></div>",
  );
});

test("unwraps a custom image without changing ordinary paragraphs", () => {
  const raw = "<p>Before</p><p>&lt;img id=amaringo /&gt;</p><p>After</p>";

  assert.equal(
    cleanMammothHtml(raw),
    '<p>Before</p><img id=amaringo /><p>After</p>',
  );
});

test("converts the checked-in DOCX fixture and exposes every marker", async () => {
  const testDirectory = path.dirname(fileURLToPath(import.meta.url));
  const fixture = path.resolve(testDirectory, "../../../public/UnitTest.docx");
  const html = await convertDocxToHtml({ path: fixture });

  for (const marker of [
    "video",
    "info",
    "quote",
    "datestamp",
    "horizontalLine",
    "amaringo",
    "vennDiagram",
  ]) {
    assert.match(html, new RegExp(`id=${marker}(?:\\s|>|/)`));
  }

  assert.doesNotMatch(html, /&lt;|&gt;/);
  assert.doesNotMatch(html, /<p>\s*<(?:div|img)\b/i);
});
