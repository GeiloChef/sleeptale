<template>
  <div class="app-container min-h-screen flex flex-col">
    <header class="header">
      <AppHeader />
    </header>

    <aside>
      <AppMenu />
    </aside>

    <main class="flex py-8 px-8 flex-grow overflow-y-auto h-full">
      <slot />
    </main>
  </div>
</template>