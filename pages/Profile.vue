<template>
  <v-container
    :class="
      !$vuetify.breakpoint.mobile
        ? 'inner-container'
        : 'inner-container__mobile'
    "
  >
    <v-row>
      <AccountDataCard :current-user="currentUser" />
    </v-row>
    <v-row class="pt-4" justify="end">
      <Tooltip
        :tooltip-title="$t('profile.supportTooltip.changeDataHintTitle')"
      >
        <i18n
          class="pa-4 mb-0"
          path="profile.supportTooltip.changeDataHintBody"
          tag="p"
        >
          <template #supportLink>
            <!-- TODO add the real support link when available -->
            <a class="no-decorate" href="#">{{
              $t('profile.supportTooltip.supportLinkTitle')
            }}</a>
          </template>
        </i18n>
      </Tooltip>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import AccountDataCard from '~/components/cards/Profile/AccountDataCard'
import Tooltip from '~/components/UI/Feedback/Tooltip'

export default {
  name: 'Profile',
  components: { AccountDataCard, Tooltip },
  computed: {
    ...mapState({
      currentUser: (state) => state.userStore.loggedUser,
    }),
  },
}
</script>

<style scoped>
.active-tab {
  background-color: #f6f7fe;
}
</style>
