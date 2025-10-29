<script setup lang="ts">
import QuizList from '@/components/QuizList.vue'
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <!-- Header Section -->
      <header class="text-center mb-16">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Welcome to
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            EXEX
          </span>
        </h1>
      </header>
      <QuizList />
    </div>
  </div>
</template>
