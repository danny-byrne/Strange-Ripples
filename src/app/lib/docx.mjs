import mammoth from "mammoth";

/**
 * Turn the escaped component markers emitted by Mammoth into parseable HTML.
 *
 * Word represents each line as a paragraph. That means a custom block spanning
 * several lines arrives as `<p><div ...></p>...<p></div></p>`, which is invalid
 * HTML. Remove only the paragraph wrappers immediately surrounding supported
 * block markers; ordinary document paragraphs remain untouched.
 */
export function cleanMammothHtml(rawHtml) {
  return rawHtml
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<p>\s*(<div\b[^>]*>)\s*<\/p>/gi, "$1")
    .replace(/<p>\s*(<\/div>)\s*<\/p>/gi, "$1")
    .replace(/<p>\s*(<div\b[^>]*>[\s\S]*?<\/div>)\s*<\/p>/gi, "$1")
    .replace(/<p>\s*(<img\b[^>]*\/?>)\s*<\/p>/gi, "$1");
}

/** Convert either a Mammoth path or buffer input into cleaned HTML. */
export async function convertDocxToHtml(input) {
  const { value } = await mammoth.convertToHtml(input);
  return cleanMammothHtml(value);
}
