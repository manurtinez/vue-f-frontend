<template>
  <!-- Perhaps add a in / out transition to this sheet in future -->
  <v-sheet
    rounded="xl"
    color="rgba(86, 41, 110, 0.2)"
    :max-width="$vuetify.breakpoint.mobile ? '600px' : '230px'"
    class="pa-4 pb-0"
  >
    <v-row justify="start" class="ml-0">
      <v-col lg="12" sm="6">
        <i18n
          class="secondary--text text-sm-subtitle-1"
          path="paymentLinkCreate.card.comissionMsg.amountReceived"
          tag="p"
        >
          <template #amount>
            <b>{{ finalAmount }}</b>
          </template>
        </i18n>
        <i18n
          class="secondary--text text-sm-subtitle-2 mb-0 font-weight-regular"
          path="paymentLinkCreate.card.comissionMsg.amountPaid"
          tag="p"
        >
          <template #amount>
            {{ comission }}
          </template>
        </i18n>
      </v-col>
      <v-col lg="12" sm="6">
        <div class="paper-plane" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'ComissionMessage',
  props: {
    finalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    comission: {
      type: Number,
      required: true,
      default: 0,
    },
  },
}
</script>
