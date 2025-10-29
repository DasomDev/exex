<script setup lang="ts">
import QuizList from '@/components/Home/QuizList.vue'
import Footer from '../components/Footer.vue'
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-orange-00">
    <div class="container mx-auto px-4 py-16">
      <!-- Header Section -->
      <header class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gray-800">
          📑
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 pl-2"
          >
            EXEX
          </span>
        </h1>
      </header>
      <QuizList />
    </div>
    <Footer />
  </div>
</template>
