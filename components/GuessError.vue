<script setup lang="ts">
defineProps({
  error: { type: String, required: true }
})
</script>

<template>
  <div class="bg-red-500 gray-50 border-0 border-white pl-1 mt-4 text-white font-bold">
     {{ error }}
  </div>
</template>
