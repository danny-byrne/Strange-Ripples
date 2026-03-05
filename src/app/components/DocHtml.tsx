// src/app/components/DocHtml.tsx
import { imagePaths } from "./docConstants";

function escapeAttr(s: string) {
  return s.replace(/"/g, "&quot;");
}

function youtubeIdFromUrl(url: string) {
  if (!url) return "";
  if (url.includes("youtu.be/"))
    return url.split("youtu.be/")[1]?.split(/[?&]/)[0] ?? "";
  if (url.includes("watch?v="))
    return url.split("watch?v=")[1]?.split(/[?&]/)[0] ?? "";
  return "";
}

export function transformDocHtml(html: string) {
  let out = html;

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
    `<hr class="doc-hr" />`,
  );

  out = out.replace(/<div\s+id=video[^>]*>([\s\S]*?)<\/div>/g, (_m, inner) => {
    const urlMatch = inner.match(/https?:\/\/[^\s"<]+/);
    const id = youtubeIdFromUrl(urlMatch?.[0] ?? "");
    if (!id) return "";
    const embed = `https://www.youtube.com/embed/${escapeAttr(id)}`;

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
  });

  out = out.replace(/<img\s+id=([a-zA-Z0-9_-]+)\s*\/?>/g, (_m, id) => {
    const entry = (imagePaths as any)[id];
    if (!entry) return "";
    const src = entry.path;
    const caption = entry.caption ?? "";

    return `
      <figure class="doc-image">
        <img src="${escapeAttr(src)}" alt="${escapeAttr(caption || id)}" loading="lazy" />
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>
    `;
  });

  return out;
}

export default function DocHtml({ html }: { html: string }) {
  const finalHtml = transformDocHtml(html);
  return <div dangerouslySetInnerHTML={{ __html: finalHtml }} />;
}
