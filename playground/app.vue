// pages/github.vue
<template>
  <UContainer class="flex flex-col gap-8 my-8">
    <UCard>
      <UForm :state="formState" @submit="initOctokit" class="space-y-4">
        <UFormGroup label="GitHub Token">
          <UInput v-model="formState.token" type="password" />
        </UFormGroup>
        <UButton type="submit" :loading="loading">
          Set Token
        </UButton>
      </UForm>
    </UCard>

    <UCard v-if="$octokit.isInitialized">
      <template #header>
        <UButton icon="i-heroicons-arrow-path" :loading="loading" @click="loadRepos">
          Refresh Repositories
        </UButton>
      </template>

      <UAlert v-if="error" color="red" :title="error" icon="i-heroicons-exclamation-triangle" />

      <UTable v-if="repos.length" :rows="repos" :columns="columns" />

      <UAlert v-else-if="!loading" icon="i-heroicons-information-circle" title="No repositories found" />
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const { $octokit } = useNuxtApp()

const formState = reactive({
  token: '',
})
const repos = ref<{ [key: string]: string }[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const columns = [
  {
    key: 'name',
    label: 'Repository',
  },
  {
    key: 'private',
    label: 'Visibility',
    formatter: (value: boolean) => value ? 'Private' : 'Public',
  },
  {
    key: 'language',
    label: 'Language',
  },
  {
    key: 'updated_at',
    label: 'Last Updated',
    formatter: (value: string) => new Date(value).toLocaleDateString(),
  },
]

async function initOctokit() {
  loading.value = true
  error.value = null

  try {
    $octokit.setToken(formState.token)
    await loadRepos()
    formState.token = ''
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to initialize GitHub'
    $octokit.clearToken()
  }
  finally {
    loading.value = false
  }
}

async function loadRepos() {
  loading.value = true
  error.value = null

  try {
    const response = await $octokit.instance.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    })
    repos.value = response.data as unknown as { [key: string]: string }[]
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load repositories'
  }
  finally {
    loading.value = false
  }
}
</script>
