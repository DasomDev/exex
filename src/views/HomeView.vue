<script setup lang="ts">
import { ref } from 'vue'

const paperList = ref([
  {
    id: 1,
    title: 'Paper 1',
    description: 'Description 1',
  },
])
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">
          Welcome to
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            EXEX
          </span>
        </h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        <div v-for="paper in paperList" :key="paper.id">
          <div class="bg-white rounded-2xl shadow-xl p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ paper.title }}</h2>
            <p class="text-gray-600">{{ paper.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
