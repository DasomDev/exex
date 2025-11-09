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
    class="flex relative gap-4 justify-center items-center py-6 mb-10 border-b border-gray-200 shadow-sm bg-white/80"
  >
    <div class="flex gap-4 items-center mx-auto w-full max-w-4xl">
      <button @click="goBack" class="p-2 rounded-lg transition-colors hover:bg-gray-100">
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
      <h1 class="flex flex-col gap-2 items-start text-2xl font-semibold text-center text-gray-800 sm:flex-row">
        <span
          v-if="subjectName"
          class="px-2 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full shrink-0"
        >
          {{ subjectName }}
        </span>
        <span class="text-lg text-gray-800">{{ title }}</span>
      </h1>
    </div>
  </div>
</template>
