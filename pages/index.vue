<script setup lang="ts">
const router = useRouter()
const route = useRoute()

useHead({ title: "Sharelinkgan" })

const code = ref("")

onMounted(() => {
  try {
    code.value = atou(route.hash.slice(1))
  } catch {
    router.push("")
  }
})

const { copy, copied } = useClipboard()

function copyUrl() {
  let url = `${location.origin}/#${utoa(code.value)}`

  if (shortHash.value) {
    url = shortUrl.value
  }

  copy(url)
}

const savedHashes = useLocalStorage<string[]>("sharelinkgan", [])

const shortHash = ref("")
const shortUrl = computed(() => {
  return getShortUrl(shortHash.value)
})
const canShorten = computed(() => !code.value.trim() && !shortHash.value)

function getShortUrl(hash: string) {
  return `${location.origin}/s/${hash}`
}

async function shorten() {
  const { data } = await useFetch<{ hash: string }>("/api/urls", {
    method: "post",
    body: {
      hash: utoa(code.value),
    }
  })

  if (data.value) {
    shortHash.value = data.value.hash
    savedHashes.value.push(data.value.hash)
  }
}

const updateUrl = useDebounceFn((text: string) => {
  const hash = "#" + utoa(text)
  router.push({ hash })
}, 500)

function update(event: Event) {
  const el = event.target as HTMLTextAreaElement
  code.value = el.value
  shortHash.value = ""
  updateUrl(el.value)
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center px-4 py-3 border-b border-neutral-500/20">
      <img src="/logo.svg" alt="Sharelinkgan" class="w-6 mr-2">
      <span class="text-sm text-neutral-400">Sharelinkgan</span>
    </div>
    <div class="flex flex-1">
      <div class="flex-1 relative">
        <div class="absolute top-0 right-0 p-4">
          <button @click="copyUrl" title="Copy link"
            class="w-8 h-8 flex justify-center items-center text-lg text-neutral-500 hover:bg-neutral-800 border border-neutral-300/10 rounded">
            <div v-if="!copied" class="i-uil-clipboard" />
            <div v-else class="i-uil-check" />
          </button>
        </div>
        <textarea :value="code" @input="update" placeholder="Type something..."
          class="block font-mono w-full h-full outline-none bg-neutral-800/20 resize-none text-neutral-300 text-xs px-4 py-2 placeholder:text-neutral-600" />
      </div>
      <div class="w-96 border-l border-neutral-500/20 p-4">
        <div class="h-20">
          <div class="font-bold tracking-wider text-xs text-neutral-600/70">URL SHORTENER</div>
          <div class="mt-2">
            <button v-if="!shortHash" @click="shorten" :disabled="canShorten"
              class="block px-4 h-8 hover:bg-neutral-800 text-sm text-neutral-500 border border-neutral-300/10 rounded cursor-pointer">
              Generate
            </button>
            <div v-else class="flex justify-center items-center gap-2 bg-neutral-600/10 p-1.5 pl-4 text-neutral-700 text-xs font-mono border-neutral-600/20 rounded">
              <div class="flex-1 truncate">{{ shortUrl }}</div>
              <button @click="copyUrl" title="Copy link"
                class="shrink-0 w-8 h-8 flex justify-center items-center text-lg text-neutral-500 hover:bg-neutral-800 border border-neutral-300/10 rounded">
                <div v-if="!copied" class="i-uil-copy" />
                <div v-else class="i-uil-check" />
              </button>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <div class="font-bold tracking-wider text-xs text-neutral-600/70">SAVED URLs</div>
          <ClientOnly>
            <ul v-if="savedHashes.length" class="mt-2">
              <li v-for="hash in savedHashes">
                <NuxtLink :to="getShortUrl(hash)" class="text-neutral-500 hover:text-neutral-400 hover:underline text-sm">
                  {{ getShortUrl(hash) }}
                </NuxtLink>
              </li>
            </ul>
            <div v-else class="mt-12 text-center text-neutral-300/10 font-italic text-sm">No saved URLs</div>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  --at-apply: h-full;
}

body {
  --at-apply: bg-neutral-900 font-sans;
}
</style>
