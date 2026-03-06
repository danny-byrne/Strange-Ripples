import * as parse5 from "parse5";
import { imagePaths } from "./docConstants";

function canonicalize(html: string) {
  // Parse as a fragment so we do not introduce <html>/<body> wrappers.
  const fragment = parse5.parseFragment(html);

  // Serialize back to HTML, parse5 normalizes tag structure the way a browser would.
  return parse5.serialize(fragment);
}

export function transformDocHtml(html: string) {
  let out = html;

  // your existing replacements...
  out = out.replace(
    /<div\s+id=quote[^>]*>([\s\S]*?)<\/div>/g,
    (_m, inner) =>
      `<blockquote class="quote-block">${inner.trim()}</blockquote>`,
  );

  out = out.replace(
    /<div\s+id=info[^>]*>([\s\S]*?)<\/div>/g,
    (_m, inner) => `<aside class="info-block">${inner.trim()}</aside>`,
  );

  out = out.replace(
    /<div\s+id=datestamp[^>]*>\s*<\/div>/g,
    `<div class="datestamp">Published June 9th 2024</div>`,
  );

  out = out.replace(
    /<div\s+id=horizontalLine[^>]*>\s*<\/div>/g,
    `<hr class="doc-hr">`,
  );

  out = out.replace(
    /<div\s+id=video[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>[\s\S]*?<\/div>/g,
    (_m, href) => {
      const id = href.includes("youtu.be/")
        ? href.split("youtu.be/")[1]?.split(/[?&]/)[0]
        : href.includes("watch?v=")
          ? href.split("watch?v=")[1]?.split(/[?&]/)[0]
          : "";

      if (!id) return "";
      const embed = `https://www.youtube.com/embed/${id}`;

      return `
        <div class="video-block">
          <div class="video-frame">
            <iframe
              src="${embed}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      `;
    },
  );

  out = out.replace(/<img\s+id=([a-zA-Z0-9_-]+)\s*\/?>/g, (_m, id) => {
    const entry = (imagePaths as any)[id];
    if (!entry) return "";

    const src = entry.path;
    const caption = entry.caption ?? "";

    return `
      <figure class="doc-image">
        <img src="${src}" alt="${caption || id}" loading="lazy">
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>
    `;
  });

  // ✅ This is the key line, normalize the HTML into a browser-like canonical DOM.
  out = canonicalize(out);

  return out.trim();
}

export default function DocHtml({ html }: { html: string }) {
  const finalHtml = transformDocHtml(html);

  return (
    <div
      className="doc-content"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: finalHtml }}
    />
  );
}
