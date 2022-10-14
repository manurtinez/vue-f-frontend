<template>
  <v-app>
    <v-container>
      <v-row justify="center" class="mb-12 mt-12">
        <!-- TODO change logo for the real one when available -->
        <v-icon role="img" aria-label="Logo de Foxtrot">mdi-account</v-icon>
      </v-row>
      <v-row justify="center">
        <v-sheet :color="logoColor" rounded="circle" height="200" width="200">
          <PortalTarget slim name="centered-icon" />
        </v-sheet>
      </v-row>
      <v-row justify="center" align="center">
        <nuxt />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ValidationLayout',
  computed: {
    ...mapState({
      logoColor: (state) => state.validationColor,
    }),
  },
  // Page headers to optimize SEO. This hook can be used to merge our own
  // custom data with the one provided from i18n plugin if needed
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
