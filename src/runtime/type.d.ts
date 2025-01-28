export interface OctokitInstance {
  instance: Octokit
  setToken: (token: string) => void
  clearToken: () => void
  isInitialized: boolean
}

declare module '#app' {
  interface NuxtApp {
    $octokit: OctokitInstance
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $octokit: OctokitInstance
  }
}
