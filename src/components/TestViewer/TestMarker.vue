<script setup lang="ts">
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

interface Props {
  sections: Section[]
  selectedAnswers: Record<number, string>
  questionStates: Record<number, { isAnswered: boolean; isCorrect: boolean }>
}

const props = defineProps<Props>()

// 전체 문제 번호 계산 함수
const getGlobalQuestionNumber = (sectionIndex: number, questionIndex: number): number => {
  let globalNumber = 0
for (let i = 0; i < sectionIndex; i++) {
    globalNumber += props.sections[i].questions.length
  }
  return globalNumber + questionIndex + 1
}

// 문제로 스크롤하는 함수
const scrollToQuestion = (sectionIndex: number, questionIndex: number) => {
  const questionId = `question-${sectionIndex}-${questionIndex}`
  const element = document.getElementById(questionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 문제 상태 확인 함수
const getQuestionStatus = (sectionIndex: number, questionIndex: number) => {
  const globalNumber = getGlobalQuestionNumber(sectionIndex, questionIndex)
  const state = props.questionStates[globalNumber]
  
  if (!state) return 'unanswered'
  if (state.isAnswered && state.isCorrect) return 'correct'
  if (state.isAnswered && !state.isCorrect) return 'incorrect'
  return 'unanswered'
}
</script>

<template>
  <div class="fixed right-4 top-1/2 z-10 p-4 bg-white rounded-lg shadow-lg transform -translate-y-1/2 w-fit h-fit">
    <div class="grid grid-cols-5 gap-2">
      <template v-for="(section, sectionIndex) in sections" :key="section.id">
        <template v-for="(question, questionIndex) in section.questions" :key="questionIndex">
          <button
            @click="scrollToQuestion(sectionIndex, questionIndex)"
            :class="[
              'w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 hover:scale-110',
              {
                'bg-gray-200 text-gray-600 hover:bg-gray-300': getQuestionStatus(sectionIndex, questionIndex) === 'unanswered',
                'bg-green-500 text-white hover:bg-green-600': getQuestionStatus(sectionIndex, questionIndex) === 'correct',
                'bg-red-500 text-white hover:bg-red-600': getQuestionStatus(sectionIndex, questionIndex) === 'incorrect'
              }
            ]"
            :title="`${getGlobalQuestionNumber(sectionIndex, questionIndex)}번 문제`"
          >
            {{ getGlobalQuestionNumber(sectionIndex, questionIndex) }}
          </button>
        </template>
      </template>
    </div>
  </div>
</template>