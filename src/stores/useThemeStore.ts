import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

type Mode = 'light' | 'dark'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const mode = ref<Mode>(
      window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    )

    function set(value: Mode) {
      mode.value = value
    }
    function toggle() {
      mode.value = mode.value === 'dark' ? 'light' : 'dark'
    }

    watchEffect(() => {
      const root = document.documentElement
      if (mode.value === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
    })

    return { mode, set, toggle }
  },
  { persist: true },
)
