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
const { copy: copyCode, copied: codeCopied } = useClipboard({ source: code })

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
    savedHashes.value.unshift(data.value.hash)
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

const sidebarOpen = ref(false)

import { EditorView, basicSetup } from "codemirror"

onMounted(() => {
  const editor = new EditorView({
    extensions: [basicSetup, editorTheme],
    parent: document.getElementById("editor")!,
  })
})
</script>

<template>
  <div class="flex flex-col h-full">
    <nav class="flex justify-between items-center px-4 py-3 bg-neutral-900 border-b border-neutral-700/70">
      <div class="flex items-center">
        <img src="/logo.svg" alt="Sharelinkgan" class="w-8 mr-2 p-0.5 bg-gray-400 rounded-full">
        <span class="text-sm text-neutral-400">Sharelinkgan</span>
      </div>
      <div class="flex items-center">
        <NuxtLink to="https://github.com/krisantuswanandi/sharelinkgan" target="_blank"
          class="flex justify-center items-center w-8 h-8 hover:bg-neutral-800 rounded">
          <div class="i-uil-github text-neutral-400 text-xl"></div>
        </NuxtLink>
        <button class="ml-1 flex justify-center items-center w-8 h-8 hover:bg-neutral-800 rounded"
          @click="sidebarOpen = true">
          <div class="i-uil-bars text-neutral-400 text-xl"></div>
        </button>
      </div>
    </nav>
    <div class="flex flex-1">
      <div class="flex-1 relative">
        <div class="absolute top-0 right-0 p-4 flex z-10">
          <button @click="copyCode()" title="Copy source code"
            class="w-10 h-10 flex justify-center items-center text-lg text-neutral-400 bg-[#1a1a1a] hover:bg-neutral-800 border border-neutral-700/70 rounded-s-md">
            <div v-if="!codeCopied" class="i-uil-clipboard" />
            <div v-else class="i-uil-check" />
          </button>
          <button @click="copyUrl" title="Copy link"
            class="w-10 h-10 flex justify-center items-center text-lg text-neutral-400 bg-[#1a1a1a] hover:bg-neutral-800 border border-neutral-700/70 rounded-e-md -ml-px">
            <div v-if="!copied" class="i-uil-link" />
            <div v-else class="i-uil-check" />
          </button>
        </div>
        <div id="editor" class="bg-[#1a1a1a] h-full"></div>
      </div>
      <div v-if="sidebarOpen"
        class="fixed top-0 left-0 right-0 bottom-0 flex justify-end bg-neutral-900/50 backdrop-blur-sm"
        @click.self="sidebarOpen = false">
        <div class="absolute top-3 right-4">
          <button class="w-8 h-8 flex justify-center items-center bg-neutral-900 hover:bg-neutral-800 rounded"
            @click="sidebarOpen = false">
            <div class="i-uil-multiply text-neutral-400 text-lg" />
          </button>
        </div>
        <div class="overflow-auto bg-neutral-900 w-96 border-l border-neutral-700/70 p-4">
          <div class="mt-2">
            <div class="font-bold tracking-wider text-xs text-neutral-600">URL SHORTENER</div>
            <div class="mt-2 h-16">
              <button v-if="!shortHash" @click="shorten" :disabled="canShorten"
                class="block px-4 h-8 hover:bg-neutral-800 text-sm text-neutral-400 border border-neutral-700/70 rounded cursor-pointer">
                Generate
              </button>
              <div v-else
                class="flex justify-center items-center gap-2 bg-neutral-600/10 p-1.5 pl-4 text-neutral-700 text-xs font-mono border-neutral-600/20 rounded">
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
            <div class="font-bold tracking-wider text-xs text-neutral-600">SAVED URLs</div>
            <ClientOnly>
              <ul v-if="savedHashes.length" class="mt-2">
                <li v-for="hash in savedHashes">
                  <NuxtLink :to="getShortUrl(hash)"
                    class="text-neutral-400 hover:text-neutral-300 hover:underline text-sm">
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
}</style>
