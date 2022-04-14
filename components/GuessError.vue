<script setup lang="ts">
defineProps({
  error: { type: String, required: true },
})
</script>

<template>
  <div
    :class="{ 'bg-red-500': !!error }"
    class="px-2 py-1 my-2 text-white font-bold min-h-8"
  >
    {{ error }}
  </div>
</template>
