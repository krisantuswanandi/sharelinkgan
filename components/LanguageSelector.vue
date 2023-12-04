<script setup lang="ts">
import type { SupportedLanguage } from "~/utils/language";

defineProps<{
  modelValue: SupportedLanguage;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const options = supportedLanguages;

function onInput(e: Event) {
  const value = (e.target as HTMLSelectElement).value;

  emit("update:modelValue", value);
}
</script>

<template>
  <div class="relative">
    <div
      class="absolute right-3 top-1.5 i-lucide-chevrons-up-down text-sm text-neutral-400"
    />
    <select
      class="appearance-none pl-2 pr-8 py-1 mr-2 bg-transparent border border-neutral-700 rounded-md text-xs text-neutral-400 outline-none hover:border-neutral-500 focus:border-neutral-500"
      :value="modelValue"
      @input="onInput"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
