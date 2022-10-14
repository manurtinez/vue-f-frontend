<template>
  <v-container>
    <v-row justify="start">
      <p class="secondary--text text-start text-sm-h3 font-weight-bold mb-10">
        {{ $t('paymentLinkCreate.title') }}
      </p>
    </v-row>
    <v-row justify="start">
      <PaymentLinkCard
        :original-link="originalLink"
        :editing="editing"
        @onSubmitLink="submitLink"
      />
    </v-row>

    <v-snackbar
      v-model="showError"
      :timeout="3000"
      absolute
      right
      bottom
      rounded="2"
      color="error"
    >
      {{ errorMsg }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'CreatePaymentLink',
  data() {
    return {
      showError: false,
      errorMsg: '',
      originalLink: this.$route.params.originalLink,
      editing: this.$route.params.editing,
    }
  },
  methods: {
    async submitLink(linkData, editing) {
      let url
      let method
      let successCode
      if (editing) {
        url = this.$urls.PAYMENT_LINK + `${linkData.link}/`
        method = 'put'
        successCode = 200
      } else {
        url = this.$urls.PAYMENT_LINK
        method = 'post'
        successCode = 201
      }
      try {
        const response = await this.$axios[method](url, linkData)
        if (response && response.status === successCode) {
          if (editing) {
            // TODO maybe add an alert for the user that the link was edited successfuly?
            this.$router.push({
              name: 'PaymentLink-List',
              params: {
                successfulEdit: true,
              },
            })
          } else {
            // TODO posibbly this URL "pay" will change, in the payment issue
            this.$router.push({
              name: 'PaymentLink-Success',
              params: {
                createdLink: {
                  ...response.data,
                  finalAmount: linkData.finalAmount,
                },
              },
            })
          }
        }
      } catch (e) {
        console.error(e)
        this.showError = true
        this.errorMsg = this.$t('paymentLinkCreate.createdErrorMsg')
        setTimeout(() => {
          this.showError = false
          this.errorMsg = ''
        }, 3000)
      }
    },
  },
}
</script>
