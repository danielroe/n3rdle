<script setup lang="ts">
import SimpleKeyboard from '../components/SimpleKeyboard.vue';
const { state, submitGuess, resetGame } = useGameState()
const input = ref('')

function onChange(inputChange) {
  input.value = inputChange
  console.log("Input changed", input)
}
function onKeyPress(button) {
  console.log("button", button)
}
function onInputChange(inputChange) {
  input.value = inputChange.target.value
}
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
      <SimpleKeyboard :input="input" :keyboardClass="keyboardClass" />
      <button class="secondary outline" @click="resetGame">Reset game</button>
    </section>
  </div>
</template>
