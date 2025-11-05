<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import quizData from '@/data/quiz.json'
import TestHeader from '@/components/TestViewer/TestHeader.vue'
import TestStatus from '@/components/TestViewer/TestStatus.vue'
import TestList from '@/components/TestViewer/TestList.vue'
import TestMarker from '@/components/TestViewer/TestMarker.vue'

interface Question {
  question: string
  options: Array<{ value: string; text: string }>
  correctAnswer: string
  explanation: {
    answer: string
    description: string
  }
}

interface Section {
  id: string
  title: string
  questions: Question[]
}

interface Quiz {
  id: string
  subjectCode: string
  title: string
  description: string
  settings: {
    showProgress: boolean
    allowRetry: boolean
    showExplanation: boolean
    timeLimit: number | null
  }
  sections: Section[]
}

const route = useRoute()
const quizId = route.params.testID as string
const router = useRouter()

// 퀴즈 데이터
const quiz = ref<Quiz | null>(null)
const sections = ref<Section[]>([])

// 전체 문제 번호 계산 함수
const getGlobalQuestionNumber = (sectionIndex: number, questionIndex: number): number => {
  let globalNumber = 0
  for (let i = 0; i < sectionIndex; i++) {
    globalNumber += sections.value[i].questions.length
  }
  return globalNumber + questionIndex + 1
}

onMounted(() => {
  // quizId에 해당하는 퀴즈 데이터를 가져옴
  const quizDataById = quizData[quizId as keyof typeof quizData]

  if (quizDataById) {
    quiz.value = quizDataById
    sections.value = quizDataById.sections
  } else {
    router.push('/test/404')
    console.error('Quiz not found:', quizId)
  }
})

// 상태 관리
const selectedAnswers = reactive<Record<number, string>>({})
const questionStates = reactive<Record<number, { isAnswered: boolean; isCorrect: boolean }>>({})

// 통계 계산
const totalQuestions = computed(() => {
  return sections.value.reduce((total, section) => total + section.questions.length, 0)
})

const answeredQuestions = computed(() => {
  return Object.keys(questionStates).length
})

const correctAnswers = computed(() => {
  return Object.values(questionStates).filter((state) => state.isCorrect).length
})

const accuracy = computed(() => {
  return answeredQuestions.value > 0
    ? Math.round((correctAnswers.value / answeredQuestions.value) * 100)
    : 0
})

// 답안 업데이트 함수
const updateAnswer = (questionId: number, answer: string) => {
  selectedAnswers[questionId] = answer
}

// 답안 체크 함수
const checkAnswer = (questionId: number, correctAnswer: string) => {
  const userAnswer = selectedAnswers[questionId]
  if (!userAnswer) {
    alert('답을 선택해주세요!')
    return
  }

  const isCorrect = userAnswer === correctAnswer

  questionStates[questionId] = {
    isAnswered: true,
    isCorrect,
  }
}
</script>
<template>
  <div class="pb-12 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
    <TestHeader
      :title="quiz?.title || '퀴즈 로딩 중...'"
      :description="
        quiz?.description ||
        '각 문제를 풀어보시고 답안 보기 버튼을 눌러 정답과 해설을 확인해보세요.'
      "
    />
    <div class="px-8 py-12 mx-auto max-w-4xl bg-white rounded-lg shadow-lg">
      <!-- 퀴즈 헤더 -->
      <p class="pb-6 mb-6 text-gray-600 border-b border-gray-200">
        {{
          quiz?.description ||
          '각 문제를 풀어보시고 답안 보기 버튼을 눌러 정답과 해설을 확인해보세요.'
        }}
      </p>

      <!-- <TestStatus
        :totalQuestions="totalQuestions"
        :answeredQuestions="answeredQuestions"
        :correctAnswers="correctAnswers"
        :accuracy="accuracy"
      /> -->
      <!-- 문제 섹션 -->
      <TestList
        :sections="sections"
        :selectedAnswers="selectedAnswers"
        :questionStates="questionStates"
        @updateAnswer="updateAnswer"
        @checkAnswer="checkAnswer"
      />
    </div>

    <!-- 고정된 문제 네비게이션 -->
    <TestMarker
      class="hidden sm:block"
      :sections="sections"
      :selectedAnswers="selectedAnswers"
      :questionStates="questionStates"
    />
  </div>
</template>
