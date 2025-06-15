<template>
  <div class="app-container flex flex-col h-dvh">
    <header class="header">
      <AppHeader />
    </header>

    <main class="flex flex-col flex-grow w-screen min-h-0">
      <div class="flex-grow overflow-y-auto px-4 py-8 min-h-0">
        <slot />
      </div>
      <BottomNavigation class="flex-shrink-0" />
    </main>
  </div>
</template>