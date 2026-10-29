# Strange Ripples — DOCX to React

A document-driven publishing prototype that turns a Word document into a styled React article.

Writers often maintain the same text in several places. This project explores a single-source workflow: write in `.docx`, add lightweight component markers, then render the document as a web page. The included “Strange Ripples” article is the demonstration content.

## What it demonstrates

- Server-side DOCX conversion with Mammoth.
- Cleanup of Word paragraph wrappers around custom block markers.
- Mapping document markers to React quote boxes, information panels, images, video embeds, separators, and date stamps.
- Responsive article styling with styled-components and a Next.js application.
- Conversion and component tests using a checked-in Word fixture.

This is a publishing prototype. Multi-platform exports and remote document synchronization are future directions; the current source reads documents from the local `public/` directory.

## Run locally

Prerequisites: Git, Node.js 22, and npm. The project was verified with Node.js 22.9.0.

```bash
git clone https://github.com/danny-byrne/Strange-Ripples.git
cd Strange-Ripples
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No API keys, database, environment file, or Word installation are required. Embedded YouTube videos need network access.

## Production build

```bash
npm run build
npm start
```

Open the URL printed in the terminal. `npm start` requires a successful build. Use a Node-capable Next.js host: the repository includes a server API route and local filesystem reads, so it is not configured as a static-only export. Include the `public/` documents and images in the deployment.

## Try the document workflow

1. Start the app and inspect the bundled article.
2. Open `public/StrangeRipples.docx` in a Word-compatible editor and update a paragraph.
3. Save the document and refresh the development page. Rebuild for production changes; the article page is prerendered during the production build.
4. Use `public/UnitTest.docx` as the reference for custom component markers.

Write markers as literal text inside the Word document, for example:

```html
<div id=quote>A highlighted quotation.</div>
<div id=info>An informational callout.</div>
<img id=amaringo />
```

Image IDs resolve through `imagePaths` in `src/app/components/constants.ts`. Add an image there and place its asset in `public/images/` when introducing a new ID. The component mapping lives in `src/app/components/utils.tsx`.

The homepage reads `StrangeRipples.docx`. The separate `/api/docx` endpoint currently converts `UnitTest.docx` and returns `{ "html": "..." }`; it is a fixture endpoint, not the homepage's content source or an upload API.

## Validation

```bash
npm test
npm run lint
npm run build
```

`npm test` runs four conversion tests and five component tests. They cover paragraph cleanup, the real DOCX fixture, and marker-to-component mapping. When extending the markup language, update the fixture and both test layers.

## Architecture

```text
Word document → Mammoth HTML → cleanup → HTML parser → React components
```

| File | Role |
| --- | --- |
| `src/app/page.tsx` | Read the article document and compose the page |
| `src/app/lib/docx.mjs` | Convert DOCX and normalize custom block HTML |
| `src/app/components/DocContent.tsx` | Parse converted content for rendering |
| `src/app/components/utils.tsx` | Map markers to presentation components |
| `src/app/components/constants.ts` | Image IDs and presentation constants |
| `pages/api/docx.js` | Return converted fixture HTML as JSON |

## Current boundaries

- Documents and marker mappings are selected in source, rather than through an editor or upload interface.
- Date-stamp output is currently hardcoded in the component mapping.
- The conversion path expects author-controlled documents; it is not an untrusted-document upload service.
- The repository uses Next.js 13 and React 18. Dependency modernization is a separate task before a new public deployment.

## Stack

Next.js · React · TypeScript · Mammoth · html-react-parser · styled-components · Node test runner · Vitest / Testing Library.
