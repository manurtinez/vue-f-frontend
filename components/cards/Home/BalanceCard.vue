<template>
  <v-sheet class="balance-card" rounded="xl" color="secondary">
    <v-row justify="center" align="center" class="pt-12">
      <p class="white--text">
        <span class="text-h3 font-weight-bold">{{ balanceWholePart }}</span
        ><span class="text-h4 font-weight-bold mr-2">{{
          balanceDecimalPart
        }}</span
        ><span class="text-h5 font-weight-light">USDC</span>
      </p>
    </v-row>
    <v-row class="pa-4">
      <v-col xs="12">
        <NuxtLink
          class="full-width d-flex justify-end text-decoration-none"
          to="/paymentlink/create"
        >
          <v-btn
            class="balance-btn white--text"
            :style="{ width: $vuetify.breakpoint.xs ? '100%' : '90%' }"
            color="#38CFDA"
            >{{ $t('home.balanceSummary.chargeBtn') }}
          </v-btn>
        </NuxtLink>
      </v-col>
      <v-col xs="12">
        <!-- TODO this should redirect to the "retirar" page when available -->
        <NuxtLink class="full-width" to="">
          <v-btn
            class="balance-btn white--text"
            :style="{ width: $vuetify.breakpoint.xs ? '100%' : '90%' }"
            color="primary"
            >{{ $t('home.balanceSummary.cashoutBtn') }}
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'BalanceCard',
  computed: {
    ...mapGetters('userStore', ['balanceWholePart', 'balanceDecimalPart']),
    ...mapState({
      currentBalance: (state) => state.userStore.loggedUser.balance,
    }),
  },
}
</script>

<style scoped>
.balance-card {
  width: 100%;
}

.balance-btn {
  border-radius: 12px;
}
</style>
