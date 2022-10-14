<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="$vuetify.breakpoint.mobile"
      permanent
      fixed
      :expand-on-hover="$vuetify.breakpoint.mobile"
      app
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in sideMenuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list-item id="logoutBtn" link to="/logout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              >{{ $t('defaultLayout.sideMenuItems.logout') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <PageHeader />
    <v-main class="main-app">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { sideMenuItems } from '~/utils/misc-constants'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      sideMenuItems,
      title: 'Foxtrot',
    }
  },
  // Page headers to optimize SEO. This hook can be used to merge our own
  // custom data with the one provided from i18n plugin if needed
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
