# Nuxt Octokit Module
A Nuxt module that provides GitHub API integration via Octokit, with support for dynamic token management.

## Features

🔑 Dynamic GitHub token management
🔄 Reactive Octokit instance

### Installation

```BASH
npm i @wgr-sa/nuxt-octokit
```

## Add Module to nuxt.config.ts
```JS
export default defineNuxtConfig({
  modules: [
    '@wgr-sa/nuxt-octokit',
  ],
})	
```

### Usage
Setting the GitHub Token
You can set the GitHub token after initialization, which is useful for auth flows:

```JS
const { $octokit } = useNuxtApp()

// Set token
$octokit.setToken('your-github-token')

// Check if initialized
if ($octokit.isInitialized) {
  // Use Octokit
  const response = await $octokit.instance.repos.getContent({
    owner: 'owner',
    repo: 'repo',
    path: 'path'
  })
}

// Clear token (e.g., on logout)
$octokit.clearToken()
```

### License
MIT License