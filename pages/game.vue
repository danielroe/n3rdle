<script setup lang="ts">
const { state, error, submitGuess, resetGame } = useGameState()
const input = ref()
input.value = submitGuess

function resetError() {
  error.value = ''
}
watch(error, () => {
  if (error) {
    error.value = String(error.value).replace(' (/api/guess)', '')
    error.value = String(error.value).replace('FetchError: 422 ', '')
  }
})
</script>

<template>
  <div>
    <h1>Game in progress</h1>
    <details>
      <summary><strong>Rules of the game</strong></summary>
      <ul>
        <li>Your job is to try to guess a five-letter word.</li>
        <li>Green means the right letter in the right place.</li>
        <li>Yellow means the right letter in the wrong place.</li>
        <li>Grey means an entirely wrong letter.</li>
      </ul>
    </details>
    <section>
      <GameBoard :state="state" />
      <GuessError :error="error" />
      <GuessForm @guess="submitGuess" @reset-error="resetError" />
      <button class="secondary outline" @click="resetGame">Reset game</button>
    </section>
  </div>
</template>
