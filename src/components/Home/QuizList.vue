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
    case 'CLOUD':
      return 'bg-yellow-100 text-yellow-400'
  }
}

const getButtonColor = (subjectCode: string) => {
  switch (subjectCode) {
    case 'OPSRCDTA':
      return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-500 hover:from-blue-200 hover:to-blue-300'
    case 'MGTSTRAT':
      return 'bg-gradient-to-r from-green-100 to-green-200 text-green-500 hover:from-green-200 hover:to-green-300'
    case 'CLOUD':
      return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-500 hover:from-yellow-200 hover:to-yellow-300'
  }
}

onMounted(() => {
  quizzes.value = quizListData.quizList
})
</script>

<template>
  <!-- 퀴즈 목록 -->
  <div class="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="quiz in quizzes"
      :key="quiz.id"
      class="p-6 bg-white rounded-2xl shadow-xl transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1"
    >
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <div class="flex gap-2 items-center mb-2">
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

      <p class="mb-4 text-sm text-gray-600 min-h-10 line-clamp-2">{{ quiz.description }}</p>

      <div class="flex justify-between items-center mb-4 text-sm text-gray-500">
        <span>{{ quiz.totalQuestions }}문제</span>
        <span>{{ quiz.estimatedTime }}</span>
      </div>
      <router-link
        :to="`/test/${quiz.id}`"
        :class="getButtonColor(quiz.subjectCode)"
        class="block px-6 py-3 w-full font-semibold text-center rounded-lg transition-all duration-300"
      >
        퀴즈 시작하기 →
      </router-link>
    </div>
  </div>
</template>
