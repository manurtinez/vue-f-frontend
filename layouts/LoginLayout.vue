<template>
  <v-app>
    <v-container class="main-container" fluid ma-0 pa-0>
      <v-row class="split" no-gutters justify="center">
        <!-- TODO change left container background for desired image when available -->
        <v-col class="split-left d-none d-md-flex"></v-col>
        <v-col class="right mt-2" cols="12" md="5" sm="8">
          <nuxt />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  // Page headers to optimize SEO. This hook can be used to merge our own
  // custom data with the one provided from i18n plugin if needed
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
