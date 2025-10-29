<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  totalQuestions: number
  answeredQuestions: number
  correctAnswers: number
  accuracy: number
}>()

const totalQuestions = computed(() => props.totalQuestions)
const answeredQuestions = computed(() => props.answeredQuestions)
const correctAnswers = computed(() => props.correctAnswers)
const accuracy = computed(() => props.accuracy)
</script>
<template>
  <!-- 퀴즈 통계 -->
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">퀴즈 진행 상황</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ totalQuestions }}</div>
        <div class="text-sm text-gray-600">총 문제</div>
      </div>
      <div class="bg-white p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ answeredQuestions }}</div>
        <div class="text-sm text-gray-600">답변 완료</div>
      </div>
      <div class="bg-white p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ correctAnswers }}</div>
        <div class="text-sm text-gray-600">정답</div>
      </div>
      <div class="bg-white p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ accuracy }}%</div>
        <div class="text-sm text-gray-600">정답률</div>
      </div>
    </div>
  </div>
</template>
