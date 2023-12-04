export const supportedLanguages = [
  { id: "json", name: "JSON" },
  { id: "vue", name: "Vue" },
  { id: "javascript", name: "Javascript" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "sql", name: "SQL" },
  { id: "markdown", name: "Markdown" },
] as const;

// get type of supported language from id of supportedLanguages
export type SupportedLanguage = (typeof supportedLanguages)[number]["id"];

export async function getLanguageExtension(val: SupportedLanguage) {
  switch (val) {
    case "vue":
      const { vue } = await import("@codemirror/lang-vue");
      return vue();

    case "html":
      const { html } = await import("@codemirror/lang-html");
      return html();

    case "css":
      const { css } = await import("@codemirror/lang-css");
      return css();

    case "sql":
      const { sql } = await import("@codemirror/lang-sql");
      return sql();

    case "markdown":
      const { markdown } = await import("@codemirror/lang-markdown");
      return markdown();

    default:
      const { javascript } = await import("@codemirror/lang-javascript");
      return javascript({
        jsx: true,
        typescript: true,
      });
  }
}
