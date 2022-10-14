<template>
  <v-app-bar
    fixed
    app
    flat
    :class="[!$vuetify.breakpoint.mobile && 'pb-4 pl-8', 'pt-8']"
  >
    <!-- If the page is one of the "root" pages, display the name -->
    <p
      v-if="pageTitles.includes($nuxt.$route.path)"
      id="header-title"
      class="ma-0 secondary--text font-weight-bold text-h4"
    >
      {{ $t(`rootPageTitles.${$nuxt.$route.path}`) }}
    </p>

    <!-- Else display a button to go back -->
    <v-btn
      v-else
      id="back-btn"
      text
      small
      color="secondary lighten-3"
      @click="$nuxt.$router.go(-1)"
    >
      <v-icon class="mr-2">mdi-arrow-left</v-icon>
      {{ $t('header.backBtn') }}
    </v-btn>
    <v-spacer />

    <!-- Notifications icon. TODO: this should react to notifications later -->
    <v-btn icon :class="!$vuetify.breakpoint.mobile && 'mr-10'">
      <v-icon color="secondary" large>mdi-bell</v-icon>
    </v-btn>

    <NuxtLink to="/profile" class="no-decorate">
      <v-sheet
        id="profile-btn"
        v-ripple
        elevation="1"
        width="200"
        rounded="lg"
        class="d-flex align-center clickable"
      >
        <div class="header-profile-icon" />
        <p class="ma-0 ml-3 secondary--text text-subtitle-2 font-weight-bold">
          {{ loggedUser.fullname }}
        </p>
      </v-sheet>
    </NuxtLink>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    // Returns an array with the paths for the root pages
    pageTitles() {
      const i18nDict = require('~/locales/' + this.$i18n.locale + '.json')
      return Object.keys(i18nDict.rootPageTitles)
    },
    ...mapState({
      loggedUser: (state) => state.userStore.loggedUser,
    }),
  },
}
</script>
