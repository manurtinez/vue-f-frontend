<template>
  <v-container
    :class="
      !$vuetify.breakpoint.mobile
        ? 'inner-container'
        : 'inner-container__mobile'
    "
  >
    <v-row justify="start" align="center">
      <v-col md="8" xs="12">
        <BalanceSummary />
      </v-col>
    </v-row>
    <v-row justify="start" align="center">
      <Tooltip :tooltip-title="$t('home.USDCtooltipTitle')">
        <p class="pa-4 mb-0">{{ $t('home.USDCtooltipBody') }}</p>
      </Tooltip>
    </v-row>
    <v-row justify="start" align="center">
      <v-col md="8" xs="12">
        <MovementsSummary />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BalanceSummary from '~/components/UI/Home/BalanceSummary'
import Tooltip from '~/components/UI/Feedback/Tooltip'
import MovementsSummary from '~/components/UI/Home/MovementsSummary'

export default {
  name: 'Home',
  components: { BalanceSummary, Tooltip, MovementsSummary },
}
</script>
