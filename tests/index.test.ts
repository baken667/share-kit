import { describe, expect, it, vi } from "vitest";
import { appendUtmParams, formatLink, share } from '../src';
import { UtmParams } from "../src/types";

describe("Format link function", () => {
  it("should replace {0} and {1} in the template", () => {
    const template = "https://example.com/?text={0}&url={1}";
    const result = formatLink(template, "Hello", "World");
    expect(result).toEqual("https://example.com/?text=Hello&url=World");
  });

  it("should return the template unchanged if no replacements", () => {
    const template = "https://example.com/?text={0}&url={1}";
    const result = formatLink(template, "", "");
    expect(result).toEqual("https://example.com/?text=&url=");
  });
});

describe("Append utm params function", () => {
  it("should add UTM params to a url", () => {
    const url = "https://example.com";
    const utmParams: UtmParams = {
      utm_source: "newsletter",
      utm_medium: "mail",
      another_utm: "utm",
    };
    const result = appendUtmParams(url, utmParams);
    expect(result).toBe(
      "https://example.com/?utm_source=newsletter&utm_medium=mail&another_utm=utm"
    );
  });

  it("should handle a URL with existing params", () => {
    const url = "https://example.com?foo=bar";
    const utmParams = {
      utm_source: "newsletter",
      utm_medium: "mail",
    };
    const result = appendUtmParams(url, utmParams);
    expect(result).toBe(
      "https://example.com/?foo=bar&utm_source=newsletter&utm_medium=mail"
    );
  });
});

describe("Share functions", () => {
  const mockWindowOpen = vi
    .spyOn(window, "open")
    .mockImplementation(() => null);

  it("should open Whatsapp link", () => {
    share({
      platform: "whatsapp",
      title: "Hello",
      desc: "World",
      url: "https://example.com",
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://wa.me/?text=Hello%20-%20World%20https%3A%2F%2Fexample.com",
      "_blank"
    );
  });

  it("should open Telegram link", () => {
    share({
      platform: "telegram",
      title: "Hello",
      desc: "World",
      url: "https://example.com",
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://t.me/share/url?url=https%3A%2F%2Fexample.com&text=Hello%20-%20World",
      "_blank"
    );
  });

  it("should use current url if url not provided", () => {
    Object.defineProperty(window, "location", {
      value: {
        href: "https://example.com",
      },
      writable: true,
    });

    share({
      platform: "telegram",
      title: "Hello",
      desc: "World",
    });

    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://t.me/share/url?url=https%3A%2F%2Fexample.com&text=Hello%20-%20World",
      "_blank"
    );
  });
});
