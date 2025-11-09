<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  title: string
  subjectName?: string
  description: string
}>()

const goBack = () => {
  router.back()
}
</script>
<template>
  <div
    class="relative flex justify-center items-center gap-4 py-6 mb-10 bg-white/80 shadow-sm border-b border-gray-200"
  >
    <div class="max-w-4xl mx-auto flex items-center gap-4 w-full">
      <button @click="goBack" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <h1 class="text-2xl font-semibold text-center text-gray-800 flex items-start gap-2">
        <span
          v-if="subjectName"
          class="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-full font-normal"
        >
          {{ subjectName }}
        </span>
        <span class="text-gray-800 text-lg">{{ title }}</span>
      </h1>
    </div>
  </div>
</template>
