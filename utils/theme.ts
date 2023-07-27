import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const foreground = "#d4d4d4";
const background = "#1a1a1a";

const editorView = EditorView.theme(
  {
    "&": {
      color: foreground,
      backgroundColor: background,
      height: "100%",
    },
    "& div": {
      flexDirection: "initial",
    },
    "&.cm-focused": {
      outline: "none",
    },
    ".cm-completionIcon": {
      display: "none",
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#d4d4d4",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: "#6663 !important",
      },
    ".cm-panels": {
      backgroundColor: background,
      color: "#a3a3a3",
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: "1px solid #404040b3",
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: "1px solid #404040b3",
    },
    ".cm-button": {
      background: "none",
      border: "1px solid #404040b3",
      borderRadius: "0.25rem",
    },
    ".cm-button:hover": {
      background: "#262626",
    },
    ".cm-searchMatch": {
      backgroundColor: "#4444",
      outline: "1px solid #777",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#8888",
    },
    ".cm-line": {
      border: "1px solid transparent",
    },
    ".cm-activeLine": {
      backgroundColor: "#6661",
      border: "1px solid #6665",
    },
    ".cm-selectionMatch": {
      backgroundColor: "#8888",
    },
    ".cm-gutters": {
      backgroundColor: background,
      color: "#a3a3a355",
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent",
      color: "#a3a3a3",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: foreground,
    },
  },
  { dark: true }
);

const syntaxHighlight = syntaxHighlighting(
  HighlightStyle.define([
    {
      tag: tags.name,
      color: "#bae2ff",
    },
    {
      tag: tags.brace,
      color: "#ffee84",
    },
    {
      tag: tags.number,
      color: "#aed799",
    },
    {
      tag: [tags.bool, tags.keyword],
      color: "#47a2ff",
    },
    {
      tag: tags.string,
      color: "#ce9178",
    },
  ])
);

export const editorTheme = [editorView, syntaxHighlight]