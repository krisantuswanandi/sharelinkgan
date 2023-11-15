<script setup lang="ts">
defineProps<{ active: boolean }>();

defineEmits<{
  (e: "close"): void;
}>();

const { savedHashes } = useSavedHashes();

const urls = computed(() => {
  return savedHashes.value.map((hash) => getUrlFromHash(hash));
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="active"
      class="fixed inset-0 flex justify-end bg-neutral-900/50 backdrop-blur-sm z-30"
      @click="$emit('close')"
    ></div>
  </Transition>
  <Transition name="slide">
    <div v-if="active" class="fixed top-0 right-0 w-96 h-full z-40">
      <div class="absolute top-3 right-4">
        <button
          class="w-8 h-8 flex justify-center items-center bg-neutral-900 hover:bg-neutral-800 rounded"
          @click="$emit('close')"
        >
          <div class="i-uil-multiply text-neutral-400 text-lg" />
        </button>
      </div>
      <div
        class="overflow-auto h-full bg-neutral-900 border-l border-neutral-700/70 p-4"
      >
        <SavedUrls :urls="urls" />
      </div>
    </div>
  </Transition>
</template>
