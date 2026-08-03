import React from "react";
import { render, screen } from "@testing-library/react";
import parse from "html-react-parser";
import { describe, expect, test, vi } from "vitest";

vi.mock("./BlogImage", () => ({
  default: ({ src, caption }: { src: string; caption: string }) => (
    <figure data-testid="blog-image" data-src={src}>
      {caption}
    </figure>
  ),
}));

vi.mock("./QuoteContainer", () => ({
  QuoteContainer: ({ children }: { children: React.ReactNode }) => (
    <blockquote data-testid="quote-container">{children}</blockquote>
  ),
  InfoContainer: ({ children }: { children: React.ReactNode }) => (
    <aside data-testid="info-container">{children}</aside>
  ),
}));

vi.mock("./VideoContainer", () => ({
  default: ({ videoId }: { videoId: string }) => (
    <div data-testid="video-container" data-video-id={videoId} />
  ),
}));

vi.mock("./HorizontalLine", () => ({
  default: () => <hr data-testid="horizontal-line" />,
}));

import { parserOptions } from "./utils";

function renderMarkup(html: string) {
  return render(<>{parse(html, parserOptions)}</>);
}

describe("DOCX marker component mapping", () => {
  test("maps quote and info blocks to their containers", () => {
    renderMarkup(
      '<div id="quote"><p>A quotation</p></div>' +
        '<div id="info"><strong>An author note</strong></div>',
    );

    expect(screen.getByTestId("quote-container")).toHaveTextContent(
      "A quotation",
    );
    expect(screen.getByTestId("info-container")).toHaveTextContent(
      "An author note",
    );
  });

  test("maps a known image ID to BlogImage metadata", () => {
    renderMarkup('<img id="amaringo" />');

    const image = screen.getByTestId("blog-image");
    expect(image).toHaveAttribute("data-src", "/images/image1.png");
    expect(image).toHaveTextContent("Ayahuasca artist Pablo Amaringo");
  });

  test("maps a video link to VideoContainer with a YouTube ID", () => {
    renderMarkup(
      '<div id="video" href="https://youtu.be/8JivVwe15v8"></div>',
    );

    expect(screen.getByTestId("video-container")).toHaveAttribute(
      "data-video-id",
      "8JivVwe15v8",
    );
  });

  test("maps the horizontal-line and datestamp markers", () => {
    renderMarkup(
      '<div id="horizontalLine"></div><div id="datestamp"></div>',
    );

    expect(screen.getByTestId("horizontal-line")).toBeInTheDocument();
    expect(screen.getByText("Published June 9th 2024")).toHaveClass(
      "datestamp",
    );
  });

  test("makes document links safe for a new browser tab", () => {
    renderMarkup('<p><a href="https://example.com">Source</a></p>');

    expect(screen.getByRole("link", { name: "Source" })).toMatchObject({
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });
});
