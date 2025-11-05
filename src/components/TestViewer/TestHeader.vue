<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  title: string
  description: string
}>()

const goBack = () => {
  router.back()
}
</script>
<template>
  <div
    class="flex justify-center items-center py-6 mb-10 bg-gradient-to-r from-blue-200 to-blue-200 border-gray-200"
  >
    <button @click="goBack" class="mr-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </button>
    <h1 class="text-2xl font-bold text-center text-gray-800">
      {{ title }}
    </h1>
  </div>
</template>
