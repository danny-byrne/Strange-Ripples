import {
  processNode,
  determineNodeType,
  createLinkElement,
  parserOptions,
  BlogImage,
  VideoContainer,
  HorizontalLine,
  QuoteContainer,
  InfoContainer,
} from "./utils"; // Adjust the import path as needed

// Additional import for handling React components in tests
import { render } from "@testing-library/react";

describe("processNode", () => {
  it("handles text nodes", () => {
    const textNode = { type: "text", data: "Hello world" };
    const result = processNode(textNode);
    expect(result).toBe("Hello world");
  });

  it("creates link elements for a tags", () => {
    const linkNode = {
      type: "tag",
      name: "a",
      attribs: { href: "https://example.com" },
      children: [{ type: "text", data: "Example" }],
    };
    const result = processNode(linkNode);
    const expected = createLinkElement(linkNode);
    expect(result).toEqual(expected);
  });

  it("recursively processes children of tag nodes", () => {
    const complexNode = {
      type: "tag",
      name: "div",
      children: [
        { type: "text", data: "Hello " },
        {
          type: "tag",
          name: "span",
          children: [{ type: "text", data: "world" }],
        },
      ],
    };
    const result = processNode(complexNode);
    expect(result).toEqual(
      <div>
        Hello <span>world</span>
      </div>
    );
  });
});

describe("determineNodeType", () => {
  it("identifies quote blocks", () => {
    const quoteBlock = {
      type: "tag",
      name: "div",
      attribs: { id: "quote" },
      children: [{ type: "text", data: "Quote content" }],
    };
    const result = determineNodeType(quoteBlock);
    expect(result.isAQuoteBlock).toBe(true);
  });

  it("identifies image tags", () => {
    const imageTag = {
      type: "tag",
      name: "img",
      attribs: { id: "exampleImage" },
    };
    const result = determineNodeType(imageTag);
    expect(result.isAnImageTag).toBe(true);
  });

  it("identifies video embeds", () => {
    const videoEmbed = {
      type: "tag",
      name: "div",
      attribs: { id: "video", href: "https://youtu.be/dQw4w9WgXcQ" }, // <- great example! :) :)
    };
    const result = determineNodeType(videoEmbed);
    expect(result.isAVideoEmbed).toBe(true);
  });

  describe("createLinkElement", () => {
    it("creates a React link element with proper attributes", () => {
      const linkNode = {
        attribs: { href: "https://example.com" },
        children: [{ type: "text", data: "Visit Example" }],
      };
      const linkElement = createLinkElement(linkNode);
      const { container } = render(linkElement);
      const link = container.querySelector("a");
      expect(link.href).toBe("https://example.com/");
      expect(link.rel).toBe("noopener noreferrer");
      expect(link.target).toBe("_blank");
      expect(link.textContent).toBe("Visit Example");
    });
  });

  describe("parserOptions.replace", () => {
    it("replaces image tags with BlogImage components", () => {
      const imageTag = {
        type: "tag",
        name: "img",
        attribs: { id: "exampleImage" },
      };
      const result = parserOptions.replace(imageTag);
      expect(result.type).toBe(BlogImage);
    });
    it("replaces quote blocks with QuoteContainer components", () => {
      const quoteBlock = {
        type: "tag",
        name: "div",
        attribs: { id: "quote" },
        children: [{ type: "text", data: "This is a quote" }],
      };
      const result = parserOptions.replace(quoteBlock);
      expect(result.type).toBe(QuoteContainer);
    });
    it("replaces video embeds with VideoContainer components", () => {
      const videoEmbed = {
        type: "tag",
        name: "div",
        attribs: { id: "video", href: "https://youtu.be/dQw4w9WgXcQ" },
      };
      const result = parserOptions.replace(videoEmbed);
      expect(result.type).toBe(VideoContainer);
    });
    it("replaces horizontal lines with HorizontalLine components", () => {
      const horizontalLine = {
        type: "tag",
        name: "hr",
        attribs: { id: "horizontalLine" },
      };
      const result = parserOptions.replace(horizontalLine);
      expect(result.type).toBe(HorizontalLine);
    });
    it("replaces info blocks with InfoContainer components", () => {
      const infoBlock = {
        type: "tag",
        name: "div",
        attribs: { id: "info" },
        children: [{ type: "text", data: "This is some info." }],
      };
      const result = parserOptions.replace(infoBlock);
      expect(result.type).toBe(InfoContainer);
    });
  });
});
