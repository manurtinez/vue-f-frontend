<template>
  <v-container>
    <v-row class="centered mb-4" justify="start" align="center">
      <p class="text--secondary font-weight-bold text-subtitle-2 ma-0">
        {{ $t('home.balanceSummary.title') }}
      </p>
    </v-row>
    <v-row>
      <BalanceCard />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BalanceSummary',
}
</script>
