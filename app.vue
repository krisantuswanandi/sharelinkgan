<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const initialCode = atou(route.hash.slice(1))
const code = ref(initialCode)

const update = useDebounceFn(() => {
  const hash = "#" + utoa(code.value)
  router.push({ hash })
}, 500)

watch(code, update)

const { copy, copied } = useClipboard()

function copyUrl() {
  copy(`${location.host}/#${utoa(code.value)}`)
}
</script>

<template>
  <div>
    <div>
      <button @click="copyUrl()">
        <span v-if="!copied">Copy URL</span>
        <span v-else>Copied!</span>
      </button>
    </div>
    <textarea v-model="code" cols="100" rows="25" />
  </div>
</template>
