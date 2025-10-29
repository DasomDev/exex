<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- 404 아이콘 -->
      <div class="mb-8">
        <div
          class="w-32 h-32 mx-auto bg-red-100 text-red-500 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            width="64"
            height="64"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
      </div>

      <!-- 에러 메시지 -->
      <div class="mb-8 text-red-500">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <h2 class="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p>The page you are looking for may have been moved or deleted.</p>
      </div>

      <!-- 액션 버튼들 -->
      <div class="space-y-3">
        <button
          @click="goHome"
          class="w-full bg-gradient-to-r from-red-100 to-red-200 text-red-500 px-6 py-3 rounded-lg font-medium"
        >
          이전 페이지로
        </button>
      </div>
    </div>
  </div>
</template>
