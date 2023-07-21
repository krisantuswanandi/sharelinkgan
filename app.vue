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
</script>

<template>
  <div>
    <textarea v-model="code" cols="100" rows="25" />
  </div>
</template>
