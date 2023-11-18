<script setup lang="ts">
const router = useRouter();
const route = useRoute();

useHead({ title: "Sharelinkgan" });

const code = ref("");
const lang = ref("json");

const updateHash = useDebounceFn(() => {
  const text = JSON.stringify({
    c: code.value,
    l: lang.value,
  });
  const hash = code.value.trim() ? "#" + utoa(text) : "";
  router.push({ hash });
}, 500);

watch(code, () => {
  updateHash();
});

watch(lang, () => {
  updateHash();
});

onMounted(() => {
  try {
    const raw = atou(route.hash.slice(1));

    // handle old hash
    if (raw.startsWith('{"c":"')) {
      const { c, l } = JSON.parse(raw);
      code.value = c || "";
      lang.value = l || "json";
    } else {
      code.value = raw;
    }
  } catch {
    router.push("");
  }
});

const { copy } = useClipboard();
const { copy: copyCode } = useClipboard({ source: code });

function copyUrl() {
  copy(`${location.origin}/#${utoa(code.value)}`);
}

const drawerOpen = ref(false);
const shortenerOpen = ref(false);

const isCodeEmpty = computed(() => code.value.trim().length === 0);
</script>

<template>
  <div class="flex flex-col h-full">
    <AppHeader>
      <LanguageSelector v-model="lang" />
      <AppDivider />
      <AppButton :disabled="isCodeEmpty" @click="copyCode()">
        <div class="i-ic-round-content-copy text-lg"></div>
      </AppButton>
      <AppButton :disabled="isCodeEmpty" @click="copyUrl">
        <div class="i-ic-round-share text-lg"></div>
      </AppButton>
      <AppButton :disabled="isCodeEmpty" @click="shortenerOpen = true">
        <div class="i-ic-round-content-cut text-lg"></div>
      </AppButton>
      <AppDivider />
      <AppButton
        to="https://github.com/krisantuswanandi/sharelinkgan"
        target="_blank"
      >
        <div class="i-uil-github text-xl"></div>
      </AppButton>
      <AppButton @click="drawerOpen = true">
        <div class="i-uil-bars text-xl"></div>
      </AppButton>
    </AppHeader>
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 relative">
        <LazyCodeEditor v-model="code" :lang="lang" />
      </div>
      <AppDrawer :active="drawerOpen" @close="drawerOpen = false" />
    </div>
    <UrlShortener
      v-if="shortenerOpen"
      :hash="route.hash.slice(1)"
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
