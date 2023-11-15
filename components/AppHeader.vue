<script setup lang="ts">
defineEmits<{
  (e: "language-select", value: string): void;
  (e: "shorten-click"): void;
  (e: "copy-click"): void;
  (e: "share-click"): void;
  (e: "drawer-click"): void;
}>();
</script>

<template>
  <nav
    class="flex justify-between items-center px-4 py-3 bg-neutral-900 border-b border-neutral-700/70"
  >
    <div class="flex items-center">
      <img
        src="/logo.svg"
        alt="Sharelinkgan"
        class="w-8 mr-2 p-0.5 bg-gray-400 rounded-full"
      />
      <span class="text-sm text-neutral-400">Sharelinkgan</span>
    </div>
    <div class="flex items-center">
      <LanguageSelector @select="$emit('language-select', $event)" />
      <AppDivider />
      <AppButton @click="$emit('copy-click')">
        <div class="i-ic-round-content-copy text-lg"></div>
      </AppButton>
      <AppButton @click="$emit('share-click')">
        <div class="i-ic-round-share text-lg"></div>
      </AppButton>
      <AppButton @click="$emit('shorten-click')">
        <div class="i-ic-round-content-cut text-lg"></div>
      </AppButton>
      <AppDivider />
      <AppButton
        to="https://github.com/krisantuswanandi/sharelinkgan"
        target="_blank"
      >
        <div class="i-uil-github text-xl"></div>
      </AppButton>
      <AppButton @click="$emit('drawer-click')">
        <div class="i-uil-bars text-xl"></div>
      </AppButton>
    </div>
  </nav>
</template>
