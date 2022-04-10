<script setup lang="ts">
const { state, submitGuess, resetGame } = useGameState()
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
      <GuessForm @guess="submitGuess" />
      <button class="secondary outline" @click="resetGame">Reset game</button>
    </section>
  </div>
</template>
