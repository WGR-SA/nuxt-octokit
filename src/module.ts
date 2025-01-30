import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-octokit',
    configKey: 'github',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(_, nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.build.transpile.push(
      '@octokit/rest',
      'fast-content-type-parse',
    )
  },
})
