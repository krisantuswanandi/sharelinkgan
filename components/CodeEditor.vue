<script setup lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { Compartment } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import type { SupportedLanguage } from "~/utils/language";

const props = defineProps<{
  modelValue: string;
  lang: SupportedLanguage;
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
      keymap.of([indentWithTab]),
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
    if (!editor || val === editor.state.doc.toString()) return;

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

    const lang = await getLanguageExtension(val);

    editor.dispatch({
      effects: language.reconfigure(lang),
    });
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
