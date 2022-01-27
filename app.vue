<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/" class="flex items-center gap-2 text-green-400">
              <img
                src="https://nuxtjs.org/design-kit/colored-logo.svg"
                height="24"
                width="24"
              />
              <strong>n3rdle</strong>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <small>Made with ❤️</small>
    </footer>
  </div>
</template>
