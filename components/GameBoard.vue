<script setup lang="ts">
defineProps({
  state: Array as () => GameState,
})
const hintMap = {
  0: 'bg-gray-600 text-white',
  1: 'bg-yellow-400 text-black',
  2: 'bg-green-700 text-white',
}
const description = {
  0: 'is not in the word.',
  1: 'is in the word, but not at the location you picked.',
  2: 'is in exactly the right location',
}
</script>

<template>
  <article>
    <ul>
      <li v-for="[guess, hint] in state" class="flex gap-1">
        <span
          v-for="(letter, i) in guess"
          class="block w-6 h-6 text-center font-bold uppercase"
          :class="hintMap[hint[i]]"
        >
          {{ letter }}
          <span class="sr-only">
            {{ description[hint[i]] }}
          </span>
        </span>
      </li>
    </ul>
  </article>
</template>
