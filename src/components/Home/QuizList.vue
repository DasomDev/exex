<script setup lang="ts">
import { ref, onMounted } from 'vue'
import quizListData from '@/data/quiz-list.json'

interface Quiz {
  id: string
  title: string
  description: string
  subjectCode: string
  subjectName: string
  totalQuestions: number
  estimatedTime: string
}

const quizzes = ref<Quiz[]>([])

const getSubjectColor = (subjectCode: string) => {
  switch (subjectCode) {
    case 'OPSRCDTA':
      return 'bg-blue-100 text-blue-400'
    case 'MGTSTRAT':
      return 'bg-green-100 text-green-400'
  }
}

const getButtonColor = (subjectCode: string) => {
  switch (subjectCode) {
    case 'OPSRCDTA':
      return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-500 hover:from-blue-200 hover:to-blue-300'
    case 'MGTSTRAT':
      return 'bg-gradient-to-r from-green-100 to-green-200 text-green-500 hover:from-green-200 hover:to-green-300'
  }
}

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
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <span
              :class="getSubjectColor(quiz.subjectCode)"
              class="px-2 py-1 text-xs font-semibold rounded"
            >
              {{ quiz.subjectName }}
            </span>
          </div>
          <h2 class="text-xl font-bold text-gray-800 line-clamp-1">{{ quiz.title }}</h2>
        </div>
      </div>

      <p class="text-gray-600 mb-4 text-sm min-h-10 line-clamp-2">{{ quiz.description }}</p>

      <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{{ quiz.totalQuestions }}문제</span>
        <span>{{ quiz.estimatedTime }}</span>
      </div>
      <router-link
        :to="`/test/${quiz.id}`"
        :class="getButtonColor(quiz.subjectCode)"
        class="block w-full text-center px-6 py-3 transition-all duration-300 rounded-lg font-semibold"
      >
        퀴즈 시작하기 →
      </router-link>
    </div>
  </div>
</template>
