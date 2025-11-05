<script setup lang="ts">
import { ref, onMounted } from 'vue'
import learnListData from '@/data/learn-list.json'

interface Learn {
  id: string
  title: string
  description: string
  subjectCode: string
  subjectName: string
}

const learns = ref<Learn[]>([])

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
  learns.value = learnListData.learnList
})
</script>

<template>
  <!-- 퀴즈 목록 -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
    <div
      v-for="learn in learns"
      :key="learn.id"
      class="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <span
              :class="getSubjectColor(learn.subjectCode)"
              class="px-2 py-1 text-xs font-semibold rounded"
            >
              {{ learn.subjectName }}
            </span>
          </div>
          <h2 class="text-xl font-bold text-gray-800 line-clamp-1">{{ learn.title }}</h2>
        </div>
      </div>

      <p class="text-gray-600 mb-4 text-sm min-h-10 line-clamp-2">{{ learn.description }}</p>

      <router-link
        :to="`/learn/${learn.id}`"
        :class="getButtonColor(learn.subjectCode)"
        class="block w-full text-center px-6 py-3 transition-all duration-300 rounded-lg font-semibold"
      >
        학습 시작하기 →
      </router-link>
    </div>
  </div>
</template>
