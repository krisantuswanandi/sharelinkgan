<script setup lang="ts">
const emit = defineEmits<{ (e: "select", value: string): void }>();

function onInput(e: Event) {
  const value = (e.target as HTMLSelectElement).value;

  emit("select", value);
}
</script>

<template>
  <div class="relative">
    <div
      class="absolute right-3 top-1.5 i-lucide-chevrons-up-down text-sm text-neutral-400"
    />
    <select
      class="appearance-none pl-2 pr-8 py-1 mr-2 bg-transparent border border-neutral-700 rounded-md text-xs text-neutral-400 outline-none hover:border-neutral-500 focus:border-neutral-500"
      @input="onInput"
    >
      <option value="json">JSON</option>
      <option value="javascript">Javascript</option>
      <option value="ruby">Ruby</option>
    </select>
  </div>
</template>
