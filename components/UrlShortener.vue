<script setup lang="ts">
const props = defineProps<{
  code: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const loading = ref(true);
const url = ref("");

onMounted(() => {
  shorten();
});

const { copy, copied } = useClipboard({ source: url });

const { savedHashes } = useSavedHashes();

async function shorten() {
  loading.value = true;

  const { data } = await useFetch<{ hash: string }>("/api/urls", {
    method: "post",
    body: {
      hash: utoa(props.code),
    },
  });

  if (data.value) {
    savedHashes.value.unshift(data.value.hash);
    url.value = getUrlFromHash(data.value.hash);
    loading.value = false;
  } else {
    alert("Failed to generate link, please refresh the page!");
  }
}

function close() {
  if (loading.value) {
    return;
  }

  emit("close");
}
</script>

<template>
  <div
    class="fixed inset-0 flex bg-neutral-800/50 backdrop-blur-sm"
    @click.self="close"
  >
    <div
      v-if="loading"
      class="flex items-center m-auto bg-neutral-900 border border-neutral-800/60 rounded-md p-4 text-sm text-neutral-500"
    >
      <div class="i-eos-icons-loading text-2xl mr-2" />
      Generating your link...
    </div>
    <div
      v-else
      class="relative m-auto w-full max-w-md bg-neutral-900 border border-neutral-800/60 rounded-md p-4 pt-8"
    >
      <div class="absolute top-2 right-2">
        <button
          class="w-8 h-8 flex justify-center items-center text-neutral-600 hover:text-neutral-500"
          @click="close"
        >
          <div class="i-uil-multiply text-lg" />
        </button>
      </div>
      <div>
        <div class="text-sm text-neutral-600">Here's your generated link:</div>
        <div class="mt-2">
          <div
            class="flex justify-center items-center gap-2 bg-neutral-600/10 p-1.5 pl-4 text-neutral-500 text-xs font-mono border-neutral-600/20 rounded"
          >
            <div class="flex-1 truncate">{{ url }}</div>
            <button
              @click="copy()"
              title="Copy link"
              class="shrink-0 w-8 h-8 flex justify-center items-center text-lg text-neutral-500 hover:bg-neutral-800 border border-neutral-300/10 rounded"
            >
              <div v-if="!copied" class="i-uil-copy" />
              <div v-else class="i-uil-check" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
