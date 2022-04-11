
<script setup lang="ts">
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

defineProps<{
  input: { type: String, required: true }
}>()

const emit = defineEmits<{
  (event: 'onKeyPress', button: string): void
}>()

let keyboard: Keyboard;

onMounted(() => {
  keyboard = new Keyboard({
    onKeyPress: onKeyPress
  })
  keyboard.addButtonTheme("1 2 3 4 5 6 7 8 9", "hg-red")
})

function onKeyPress(button) {
  emit("onKeyPress", button)
}

</script>
<template>
  <div class="simple-keyboard"></div>
</template>
<style scoped lang="css">
.simple-keyboard {
  width: 100%;
  height: 100%;
}

.hidden-buttons {
  display: none !important; 
  visibility: collapse !important;
}
</style>
