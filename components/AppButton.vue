<script setup lang="ts">
defineProps<{ to?: string }>();

const className =
  "flex justify-center items-center w-8 h-8 hover:bg-neutral-800 rounded text-neutral-400 disabled:text-neutral-700 disabled:pointer-events-none";
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="className" v-bind="$attrs">
    <slot />
  </NuxtLink>
  <button v-else :class="className" v-bind="$attrs">
    <slot />
  </button>
</template>
