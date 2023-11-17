import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const foreground = "#d4d4d4";
const background = "#1a1a1a";

const highlightColors = {
  blue: "#569cd6",
  darkBlue: "#569cd6",
  lightBlue: "#9cdcfe",
  purple: "#c586c0",
  gray: "#808080",
  yellow: "#dcdcaa",
  lightGreen: "#b5cea8",
  bluerGreen: "#4ec9b0",
  green: "#6a9955",
  orange: "#ce9178",
  lightOrange: "#d7ba7d",
};

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
      tag: [tags.brace],
      color: "#ffee84",
    },
    {
      tag: [tags.paren],
      color: "#679ad1",
    },
    {
      tag: [tags.squareBracket],
      color: "#bc89bd",
    },
    {
      tag: tags.number,
      color: highlightColors.lightGreen,
    },
    {
      tag: [tags.string, tags.attributeValue, tags.monospace],
      color: highlightColors.orange,
    },
    {
      tag: tags.typeName,
      color: highlightColors.bluerGreen,
    },
    {
      tag: tags.comment,
      color: highlightColors.green,
    },
    {
      tag: [tags.function(tags.variableName), tags.propertyName, tags.keyword],
      color: highlightColors.purple,
    },
    {
      tag: [
        tags.definitionKeyword,
        tags.tagName,
        tags.bool,
        tags.documentMeta,
        tags.heading,
      ],
      color: highlightColors.darkBlue,
    },
    {
      tag: [tags.attributeName, tags.name, tags.propertyName],
      color: highlightColors.lightBlue,
    },
    {
      tag: tags.angleBracket,
      color: highlightColors.gray,
    },
    {
      tag: tags.className,
      color: highlightColors.lightOrange,
    },
  ])
);

export const editorTheme = [editorView, syntaxHighlight];
