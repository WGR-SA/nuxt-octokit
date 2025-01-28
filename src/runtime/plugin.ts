import { Octokit } from '@octokit/rest'
import { ref } from 'vue'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const octokitRef = ref<Octokit | null>(null)

  function setGithubToken(token: string) {
    octokitRef.value = new Octokit({
      auth: token,
      userAgent: 'nuxt-octokit-module',
    })
  }

  function clearGithubToken() {
    octokitRef.value = null
  }

  return {
    provide: {
      octokit: {
        get instance() {
          if (!octokitRef.value) {
            throw new Error('Octokit not initialized. Call setGithubToken first.')
          }
          return octokitRef.value
        },
        setToken: setGithubToken,
        clearToken: clearGithubToken,
        get isInitialized() {
          return octokitRef.value !== null
        },
      },
    },
  }
})
