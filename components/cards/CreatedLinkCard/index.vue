<template>
  <v-sheet rounded="xl" elevation="1" width="800px" class="pa-5">
    <v-row>
      <v-col cols="12" sm="5">
        <!-- TODO replace image when available -->
        <v-img
          src="https://via.placeholder.com/150"
          height="200px"
          alt="imagen de link creado con éxito"
          contain
        ></v-img>
        <!-- TODO replace image when available -->
      </v-col>
      <v-col cols="12" sm="7">
        <p class="secondary--text font-weight-bold text-h5">
          {{ $t('paymentLinkSuccess.createdLinkCard.titleAwesome') }}
        </p>
        <p class="secondary--text font-weight-bold text-h5">
          {{ $t('paymentLinkSuccess.createdLinkCard.titleReady') }}
        </p>
        <v-text-field
          id="linkField"
          :value="`${$config.pageDomain}pay/${createdLink.link}`"
          background-color="rgba(86, 41, 110, 0.2)"
          hide-details
          outlined
          rounded
          readonly
        ></v-text-field>
        <v-row justify="end">
          <v-btn text color="primary" class="mt-2" @click="copyLink"
            >{{ $t('paymentLinkSuccess.createdLinkCard.copyLinkTitle') }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="5" class="centered">
        <p
          id="createdLinkInvoice"
          class="primary--text text-subtitle-1 font-weight-medium mb-0"
        >
          #{{ createdLink.invoice_number }}
        </p>
        <p
          id="createdLinkTitle"
          class="secondary--text text-subtitle-1 font-weight-medium mb-0"
        >
          {{ createdLink.title }}
        </p>
        <p
          id="createdLinkAmount"
          class="secondary--text text-h5 font-weight-black mb-0"
        >
          {{ createdLink.amount }} USD
        </p>
        <i18n
          id="createdLinkFinalAmount"
          class="secondary--text text-subtitle-1 font-weight-light"
          path="paymentLinkSuccess.createdLinkCard.finalReceivedAmount"
          tag="p"
        >
          <template #finalAmount>
            {{ createdLink.finalAmount }}
          </template>
        </i18n>
      </v-col>
      <v-col cols="12" sm="7">
        <p class="secondary--text text-subtitle-1 font-weight-bold mb-0">
          {{ $t('paymentLinkSuccess.createdLinkCard.shareLinkTitle') }}
        </p>
        <ShareLinkNav :link-data="createdLink" />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="showAlert"
      :timeout="3000"
      absolute
      right
      bottom
      rounded="2"
      :color="alertInfo.type"
    >
      {{ alertInfo.text }}
    </v-snackbar>
  </v-sheet>
</template>

<script>
export default {
  name: 'CreatedLinkCard',
  props: {
    createdLink: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      showAlert: false,
      alertInfo: {
        text: '',
        type: '',
      },
      alertTimeout: null,
    }
  },
  beforeDestroy() {
    if (this.alertTimeout) clearTimeout(this.alertTimeout)
  },
  methods: {
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.createdLink.link)
        this.alertInfo = {
          text: this.$t('paymentLinkSuccess.createdLinkCard.copyLinkSuccess'),
          type: 'success',
        }
      } catch (err) {
        console.error('There was a problem copying link to clipboard --> ', err)
        this.alertInfo = {
          text: this.$t('paymentLinkSuccess.createdLinkCard.copyLinkError'),
          type: 'error',
        }
      }
      this.showAlert = true
      this.alertTimeout = setTimeout(() => {
        this.showAlert = false
      }, 3000)
    },
  },
}
</script>
