import React, { useEffect } from "react";
import { marked } from "marked";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: 'dark' });

const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

marked.use({
  renderer: {
    code(token) {
      const code = token.text;
      const lang = token.lang || "";
      if (lang === "mermaid") {
        return `<div class="mermaid">${escapeHtml(code)}</div>`;
      }
      return false;
    }
  }
});

const decodeReadme = (readmeDto) => {
  if (!readmeDto || !readmeDto.content) return "";
  if (readmeDto.encoding === "base64") {
    try {
      const cleanBase64 = readmeDto.content.replace(/\s/g, "");
      return decodeURIComponent(
        atob(cleanBase64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch (e) {
      console.error("Base64 decoding failed:", e);
      try {
        return atob(readmeDto.content.replace(/\s/g, ""));
      } catch (err) {
        return readmeDto.content;
      }
    }
  }
  return readmeDto.content;
};

const transformMarkdownUrls = (md, repoOwner, repoName, downloadUrl) => {
  if (!md) return "";
  
  let baseUrl = "";
  if (downloadUrl) {
    baseUrl = downloadUrl.substring(0, downloadUrl.lastIndexOf("/") + 1);
  } else {
    baseUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/`;
  }
  
  const resolveRelativeUrl = (base, relativePath) => {
    if (!relativePath) return "";
    let cleanPath = relativePath;
    if (cleanPath.startsWith("./")) {
      cleanPath = cleanPath.substring(2);
    }
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }
    return `${base}${cleanPath}`;
  };

  let result = md.replace(/!\[([^\]]*)\]\((?!https?:\/\/|#|data:)([^)]+)\)/g, (match, alt, path) => {
    return `![${alt}](${resolveRelativeUrl(baseUrl, path)})`;
  });

  result = result.replace(/<img([^>]*)\bsrc=["'](?!https?:\/\/|#|data:)([^"']+)["']/gi, (match, attrs, path) => {
    return `<img${attrs}src="${resolveRelativeUrl(baseUrl, path)}"`;
  });
  
  return result;
};

const ReadmeTab = ({ readme, owner, repoName }) => {
  useEffect(() => {
    if (readme) {
      const renderMermaid = async () => {
        try {
          await mermaid.run({ querySelector: '.mermaid' });
        } catch (e) {
          console.warn("Mermaid rendering failed:", e);
        }
      };
      const timer = setTimeout(renderMermaid, 100);
      return () => clearTimeout(timer);
    }
  }, [readme]);

  if (!readme) {
    return (
      <div className="p-8 text-center text-gray-450 italic">
        No README.md found in the root directory.
      </div>
    );
  }

  try {
    let rawMarkdown = decodeReadme(readme);
    rawMarkdown = transformMarkdownUrls(rawMarkdown, owner, repoName, readme.download_url);
    const html = marked.parse(rawMarkdown);
    return (
      <div
        className="p-8 prose prose-invert max-w-none text-gray-300 break-words mermaid-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (e) {
    return <div className="p-8 text-red-400">Failed to render README.md.</div>;
  }
};

export default ReadmeTab;
