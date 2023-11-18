<template>
  <nav
    class="flex justify-between items-center px-4 py-3 bg-neutral-900 border-b border-neutral-700/70"
  >
    <div class="flex items-center">
      <img
        src="/logo.svg"
        alt="Sharelinkgan"
        class="w-8 mr-2 p-0.5 bg-gray-400 rounded-full"
      />
      <span class="text-sm text-neutral-400">Sharelinkgan</span>
    </div>
    <div class="flex items-center">
      <slot />
    </div>
  </nav>
</template>
