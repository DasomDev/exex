<script setup lang="ts">
import { reactive } from 'vue'

interface Section {
  id: string
  title: string
  questions: Question[]
}

interface Question {
  question: string
  options: Array<{ value: string; text: string }>
  correctAnswer: string
  explanation: {
    answer: string
    description: string
  }
}

const props = defineProps<{
  sections: Section[]
}>()

// 전체 문제 번호 계산 함수
const getGlobalQuestionNumber = (sectionIndex: number, questionIndex: number): number => {
  let globalNumber = 0
  for (let i = 0; i < sectionIndex; i++) {
    globalNumber += props.sections[i].questions.length
  }
  return globalNumber + questionIndex + 1
}

// 상태 관리
const selectedAnswers = reactive<Record<number, string>>({})
const questionStates = reactive<Record<number, { isAnswered: boolean; isCorrect: boolean }>>({})

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
  <div class="space-y-8">
    <div v-for="(section, sectionIndex) in sections" :key="section.id" class="bg-white">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-2">
        {{ sectionIndex + 1 }}. {{ section.title }}
      </h2>

      <div class="space-y-6">
        <div
          v-for="(question, questionIndex) in section.questions"
          :key="questionIndex + 1"
          class="bg-gray-50 border border-gray-200 rounded-lg p-6"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
            문제 {{ getGlobalQuestionNumber(sectionIndex, questionIndex) }}
          </h3>
          <p class="text-gray-700 mb-4 font-medium">{{ question.question }}</p>

          <!-- 선택지 -->
          <div class="space-y-3 mb-4">
            <label
              v-for="option in question.options"
              :key="option.value"
              :class="[
                'flex items-center p-3 px-4 border rounded-2xl cursor-pointer transition-all duration-200',
                selectedAnswers[getGlobalQuestionNumber(sectionIndex, questionIndex)] ===
                option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-25',
                questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isAnswered
                  ? 'pointer-events-none'
                  : '',
              ]"
            >
              <input
                type="radio"
                :name="`q${getGlobalQuestionNumber(sectionIndex, questionIndex)}`"
                :value="option.value"
                v-model="selectedAnswers[getGlobalQuestionNumber(sectionIndex, questionIndex)]"
                :disabled="
                  questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isAnswered
                "
                class="mr-3 scale-125 hidden"
              />
              <span class="text-gray-700 uppercase border-r border-gray-300 pr-4 mr-4">
                {{ option.value }}
              </span>
              <span class="text-gray-700 font-medium">{{ option.text }}</span>
            </label>
          </div>

          <!-- 답안 보기 버튼 -->
          <button
            @click="
              checkAnswer(
                getGlobalQuestionNumber(sectionIndex, questionIndex),
                question.correctAnswer,
              )
            "
            :disabled="
              !selectedAnswers[getGlobalQuestionNumber(sectionIndex, questionIndex)] ||
              questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isAnswered
            "
            :class="[
              'px-6 py-2 rounded-lg font-medium transition-colors duration-200 mx-auto',
              selectedAnswers[getGlobalQuestionNumber(sectionIndex, questionIndex)] &&
              !questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            {{
              questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isAnswered
                ? '답변 완료'
                : '답안 보기'
            }}
          </button>

          <!-- 해설 -->
          <div
            v-if="questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isAnswered"
            class="mt-4 p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div class="flex items-center mb-3">
              <span
                :class="[
                  'inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full text-sm font-bold',
                  questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isCorrect
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600',
                ]"
              >
                {{
                  questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isCorrect
                    ? '✓'
                    : '✗'
                }}
              </span>
              <span
                :class="[
                  'font-semibold',
                  questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isCorrect
                    ? 'text-green-600'
                    : 'text-red-600',
                ]"
              >
                {{
                  questionStates[getGlobalQuestionNumber(sectionIndex, questionIndex)]?.isCorrect
                    ? '정답입니다!'
                    : '틀렸습니다.'
                }}
              </span>
            </div>
            <p class="text-gray-700 mb-2"><strong>정답:</strong> {{ question.correctAnswer }}</p>
            <p class="text-gray-700">
              <strong>해설:</strong> {{ question.explanation.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
