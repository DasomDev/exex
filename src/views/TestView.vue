<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import quizData from '@/data/quiz.json'

interface Question {
  id: number
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

// 퀴즈 데이터
const quiz = ref<Quiz | null>(null)
const sections = ref<Section[]>([])

onMounted(() => {
  // 실제로는 quizId에 따라 다른 퀴즈 파일을 로드해야 함
  // 지금은 open101만 있으므로 quiz.json을 사용
  if (quizId === 'open101') {
    quiz.value = quizData
    sections.value = quizData.sections
  } else {
    // 퀴즈를 찾을 수 없는 경우
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
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- 퀴즈 헤더 -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">
          {{ quiz?.title || '퀴즈 로딩 중...' }}
        </h1>
        <p class="text-gray-600">
          {{
            quiz?.description ||
            '각 문제를 풀어보시고 답안 보기 버튼을 눌러 정답과 해설을 확인해보세요.'
          }}
        </p>
      </div>

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

      <!-- 문제 섹션 -->
      <div class="space-y-8">
        <div
          v-for="(section, sectionIndex) in sections"
          :key="section.id"
          class="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            {{ sectionIndex + 1 }}. {{ section.title }}
          </h2>

          <div class="space-y-6">
            <div
              v-for="(question, questionIndex) in section.questions"
              :key="question.id"
              class="bg-gray-50 border border-gray-200 rounded-lg p-6"
            >
              <h3 class="text-lg font-semibold text-gray-800 mb-4">문제 {{ question.id }}</h3>
              <p class="text-gray-700 mb-4 font-medium">{{ question.question }}</p>

              <!-- 선택지 -->
              <div class="space-y-3 mb-4">
                <label
                  v-for="option in question.options"
                  :key="option.value"
                  :class="[
                    'flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200',
                    selectedAnswers[question.id] === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-blue-25',
                    questionStates[question.id]?.isAnswered ? 'pointer-events-none' : '',
                  ]"
                >
                  <input
                    type="radio"
                    :name="`q${question.id}`"
                    :value="option.value"
                    v-model="selectedAnswers[question.id]"
                    :disabled="questionStates[question.id]?.isAnswered"
                    class="mr-3 scale-125"
                  />
                  <span class="text-gray-700">{{ option.value }}) {{ option.text }}</span>
                </label>
              </div>

              <!-- 답안 보기 버튼 -->
              <button
                @click="checkAnswer(question.id, question.correctAnswer)"
                :disabled="!selectedAnswers[question.id] || questionStates[question.id]?.isAnswered"
                :class="[
                  'px-6 py-2 rounded-lg font-medium transition-colors duration-200',
                  selectedAnswers[question.id] && !questionStates[question.id]?.isAnswered
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                ]"
              >
                {{ questionStates[question.id]?.isAnswered ? '답변 완료' : '답안 보기' }}
              </button>

              <!-- 해설 -->
              <div
                v-if="questionStates[question.id]?.isAnswered"
                class="mt-4 p-4 bg-white border border-gray-200 rounded-lg"
              >
                <div class="flex items-center mb-3">
                  <span
                    :class="[
                      'inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full text-sm font-bold',
                      questionStates[question.id]?.isCorrect
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600',
                    ]"
                  >
                    {{ questionStates[question.id]?.isCorrect ? '✓' : '✕' }}
                  </span>
                  <span
                    :class="[
                      'font-semibold',
                      questionStates[question.id]?.isCorrect ? 'text-green-600' : 'text-red-600',
                    ]"
                  >
                    {{ questionStates[question.id]?.isCorrect ? '정답입니다!' : '틀렸습니다.' }}
                  </span>
                </div>
                <p class="text-gray-700 mb-2">
                  <strong>정답:</strong> {{ question.correctAnswer }}
                </p>
                <p class="text-gray-700">
                  <strong>해설:</strong> {{ question.explanation.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
