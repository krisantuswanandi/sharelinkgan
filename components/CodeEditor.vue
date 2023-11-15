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
  () => props.lang,
  async (val) => {
    if (!editor) return;

    if (val === "javascript") {
      const { javascript } = await import("@codemirror/lang-javascript");

      editor.dispatch({
        effects: language.reconfigure(javascript()),
      });
    } else {
      editor.dispatch({
        effects: language.reconfigure(json()),
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
