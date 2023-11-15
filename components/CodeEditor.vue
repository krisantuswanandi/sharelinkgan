<script setup lang="ts">
import { EditorView, basicSetup } from "codemirror";
import { Compartment } from "@codemirror/state";
import { json } from "@codemirror/lang-json";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

onMounted(() => {
  const language = new Compartment();

  const view = new EditorView({
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

  // trying language change
  setTimeout(async () => {
    const { javascript } = await import("@codemirror/lang-javascript");
    view.dispatch({
      effects: language.reconfigure(javascript()),
    });
  }, 1000);
});
</script>

<template>
  <div id="editor" class="bg-[#1a1a1a] h-full"></div>
</template>

<style>
.cm-editor .cm-scroller {
  --at-apply: font-mono text-xs;
}
</style>
