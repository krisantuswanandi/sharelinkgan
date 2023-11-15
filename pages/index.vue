<script setup lang="ts">
const router = useRouter();
const route = useRoute();

useHead({ title: "Sharelinkgan" });

const code = ref("");

const updateUrl = useDebounceFn((text: string) => {
  const hash = "#" + utoa(text);
  router.push({ hash });
}, 500);

watch(code, (value) => {
  updateUrl(value);
});

try {
  code.value = atou(route.hash.slice(1));
} catch {
  router.push("");
}

const { copy } = useClipboard();
const { copy: copyCode } = useClipboard({ source: code });

function copyUrl() {
  copy(`${location.origin}/#${utoa(code.value)}`);
}

const drawerOpen = ref(false);
const shortenerOpen = ref(false);

function changeLanguage(value: string) {
  console.log("change language", value);
}
</script>

<template>
  <div class="flex flex-col h-full">
    <AppHeader
      @language-select="changeLanguage"
      @shorten-click="shortenerOpen = true"
      @copy-click="copyCode()"
      @share-click="copyUrl"
      @drawer-click="drawerOpen = true"
    />
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 relative">
        <CodeEditor v-model="code" />
      </div>
      <AppDrawer :active="drawerOpen" @close="drawerOpen = false" />
    </div>
    <UrlShortener
      v-if="shortenerOpen"
      :code="code"
      @close="shortenerOpen = false"
    />
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

.fade-enter-active,
.fade-leave-active {
  --at-apply: transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  --at-apply: opacity-0;
}

.slide-enter-active,
.slide-leave-active {
  --at-apply: transition-transform duration-300;
}

.slide-enter-from,
.slide-leave-to {
  --at-apply: translate-x-full;
}
</style>
