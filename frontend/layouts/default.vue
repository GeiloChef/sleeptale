<template>
  <div class="app-container flex flex-col h-screen">
    <header class="header">
      <AppHeader />
    </header>

    <aside>
      <AppMenu />
    </aside>

    <main class="flex flex-grow overflow-y-auto h-full w-screen py-8">
      <slot />
    </main>
  </div>
</template>