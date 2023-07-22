<script setup lang="ts">
const router = useRouter()
const route = useRoute()

useHead({ title: "Sharelinkgan" })

const code = ref("")

onMounted(() => {
  code.value = atou(route.hash.slice(1))
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
    <div>
      <img src="/logo.svg" alt="Sharelinkgan" width="75">
    </div>
    <div>
      <button @click="copyUrl">
        <span v-if="!copied">Copy URL</span>
        <span v-else>Copied!</span>
      </button>
      <button @click="shorten" :disabled="canShorten">
        Shorten URL
      </button>
      <span v-if="shortHash">
        <NuxtLink :to="shortUrl">{{ shortUrl }}</NuxtLink>
      </span>
    </div>
    <textarea :value="code" cols="100" rows="25" @input="update" />
  </div>
</template>
