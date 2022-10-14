<template>
  <v-app>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    // Page headers to optimize SEO. This hook can be used to merge our own
    // custom data with the one provided from i18n plugin if needed
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title,
      ...i18nHead,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
