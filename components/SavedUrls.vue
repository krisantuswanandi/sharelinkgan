<script setup lang="ts">
defineProps<{ urls: string[] }>();
</script>

<template>
  <div class="mt-2">
    <div class="font-bold tracking-wider text-xs text-neutral-600">
      SAVED URLs
    </div>
    <ul v-if="urls.length" class="mt-2">
      <li v-for="url in urls">
        <NuxtLink
          :to="url"
          class="text-neutral-400 hover:text-neutral-300 hover:underline text-sm"
        >
          {{ url }}
        </NuxtLink>
      </li>
    </ul>
    <div
      v-else
      class="mt-12 text-center text-neutral-300/10 font-italic text-sm"
    >
      No saved URLs
    </div>
  </div>
</template>
