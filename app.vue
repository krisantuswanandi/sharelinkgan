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

const shortHash = ref("")
const shortUrl = computed(() => {
  return `${location.origin}/s/${shortHash.value}`
})
const canShorten = computed(() => !code.value.trim() && !shortHash.value)

async function shorten() {
  const { data } = await useFetch<{ hash: string }>("/api/urls", {
    method: "post",
    body: {
      hash: utoa(code.value),
    }
  })

  if (data.value) {
    shortHash.value = data.value.hash
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
    <textarea :value="code" cols="100" rows="25" @input="update" />
  </div>
</template>
