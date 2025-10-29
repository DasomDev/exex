<script setup lang="ts">
import { ref, onMounted } from 'vue'
import quizListData from '@/data/quiz-list.json'

interface Quiz {
  id: string
  title: string
  description: string
  subjectCode: string
  totalQuestions: number
  difficulty: string
  estimatedTime: string
  createdAt: string
}

const quizzes = ref<Quiz[]>([])

onMounted(() => {
  quizzes.value = quizListData.quizList
})
</script>

<template>
  <!-- 퀴즈 목록 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
    <div
      v-for="quiz in quizzes"
      :key="quiz.id"
      class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-xl font-bold text-gray-800 line-clamp-1">{{ quiz.title }}</h2>
        <!-- <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            quiz.difficulty === '초급'
              ? 'bg-green-100 text-green-800'
              : quiz.difficulty === '중급'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800',
          ]"
        >
          {{ quiz.difficulty }}
        </span> -->
      </div>

      <p class="text-gray-600 mb-4 text-sm min-h-10 line-clamp-2">{{ quiz.description }}</p>

      <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{{ quiz.totalQuestions }}문제</span>
        <span>{{ quiz.estimatedTime }}</span>
      </div>

      <router-link
        :to="`/test/${quiz.id}`"
        class="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold"
      >
        퀴즈 시작하기 →
      </router-link>
    </div>
  </div>
</template>
