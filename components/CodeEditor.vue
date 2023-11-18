<script setup lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { Compartment } from "@codemirror/state";
import { json } from "@codemirror/lang-json";

const props = defineProps<{
  modelValue: string;
  lang: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

let editor: EditorView | null = null;
const language = new Compartment();

onMounted(() => {
  editor = new EditorView({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      editorTheme,
      language.of(json()),
      EditorView.lineWrapping,
      EditorView.updateListener.of((e) => {
        if (e.docChanged) {
          emit("update:modelValue", e.state.doc.toString());
        }
      }),
    ],
    parent: document.getElementById("editor")!,
  });
});

watch(
  () => props.modelValue,
  (val) => {
    if (!editor) return;

    editor.dispatch({
      changes: {
        from: 0,
        to: editor.state.doc.length,
        insert: val,
      },
    });
  }
);

watch(
  () => props.lang,
  async (val) => {
    if (!editor) return;

    if (val === "vue") {
      const { vue } = await import("@codemirror/lang-vue");

      editor.dispatch({
        effects: language.reconfigure(vue()),
      });
    } else if (val === "javascript") {
      const { javascript } = await import("@codemirror/lang-javascript");

      editor.dispatch({
        effects: language.reconfigure(
          javascript({
            jsx: true,
            typescript: true,
          })
        ),
      });
    } else if (val === "html") {
      const { html } = await import("@codemirror/lang-html");

      editor.dispatch({
        effects: language.reconfigure(html()),
      });
    } else if (val === "css") {
      const { css } = await import("@codemirror/lang-css");

      editor.dispatch({
        effects: language.reconfigure(css()),
      });
    } else if (val === "sql") {
      const { sql } = await import("@codemirror/lang-sql");

      editor.dispatch({
        effects: language.reconfigure(sql()),
      });
    } else if (val === "markdown") {
      const { markdown } = await import("@codemirror/lang-markdown");

      editor.dispatch({
        effects: language.reconfigure(markdown()),
      });
    } else {
      const { javascript } = await import("@codemirror/lang-javascript");

      editor.dispatch({
        effects: language.reconfigure(javascript()),
      });
    }
  }
);
</script>

<template>
  <div id="editor" class="bg-[#1a1a1a] h-full"></div>
</template>

<style>
.cm-editor .cm-scroller {
  --at-apply: font-mono text-xs;
}
</style>
