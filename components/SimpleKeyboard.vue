<template>
  <div :class="keyboardClass"></div>
</template>
<script setup lang="ts">
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

const props = defineProps({
  input: {
    type: String,
    required: true
  },
  keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
})

const keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});

function onChange(input){
  input = this.input;
  console.log("Input changed", input);
}

function onKeyPress(button){
  console.log("Button pressed", button);
}

</script>
<style scoped>
keyboardClass {
  width: 100%;
  height: 100%;
}
</style>
