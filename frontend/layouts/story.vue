<template>
  <div class="app-container flex flex-col h-screen max-w-screen">
    <header class="header">
      <AppHeader />
    </header>

    <aside>
      <AppMenu />
    </aside>

    <main class="flex flex-grow overflow-y-auto h-full">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
</script>