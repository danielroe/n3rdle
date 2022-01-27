<template>
  <div class="container">
    <Html lang="en-GB" />
    <Title>n3rdle</Title>
    <Meta
      name="description"
      content="A tiny, incomplete clone of Wordle for a live-coding session at Vue.js Nation."
    />
    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/" class="flex items-center gap-2 text-green-400">
              <img
                alt="Nuxt logo"
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
      <small>
        Made with ❤️
        <a href="https://github.com/danielroe/n3rdle">Contributions welcome</a>
      </small>
    </footer>
  </div>
</template>
