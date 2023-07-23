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
  <div>
    <div class="flex items-center mb-2">
      <img src="/logo.svg" alt="Sharelinkgan" class="w-10 mr-1">
      <span class="text-xl font-bold">Sharelinkgan</span>
    </div>
    <div class="flex">
      <div class="flex-1">
        <div class="mb-2">
          <button @click="copyUrl" class="mr-1">
            <span v-if="!copied">Copy URL</span>
            <span v-else>Copied!</span>
          </button>
          <button @click="shorten" :disabled="canShorten" class="mr-1">
            Shorten URL
          </button>
          <span v-if="shortHash">
            <NuxtLink :to="shortUrl">{{ shortUrl }}</NuxtLink>
          </span>
        </div>
        <textarea :value="code" @input="update" class="w-full h-xl" />
      </div>
      <div class="w-96">
        <div class="pl-6 font-bold">Saved Urls</div>
        <ul>
          <li v-for="hash in savedHashes">
            <NuxtLink :to="getShortUrl(hash)">{{ getShortUrl(hash) }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
