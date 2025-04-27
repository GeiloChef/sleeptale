<template>
  <div class="app-container h-screen flex flex-col">
    <header class="header">
      <AppHeader />
    </header>

    <main class="content py-16 px-8 flex-grow overflow-y-auto">
      <slot />
    </main>
  </div>
</template>