<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="12" lg="6" xl="5">
        <v-sheet
          rounded="xl"
          elevation="1"
          :max-width="!$vuetify.breakpoint.lg ? '600px' : '550px'"
          class="pa-8 pt-6"
        >
          <v-form ref="form" v-model="isFormValid">
            <v-row no-gutters>
              <v-col cols="12">
                <p
                  class="secondary--text text-md-subtitle-2 font-weight-medium mb-6"
                >
                  *&nbsp;{{ $t('paymentLinkCreate.card.fieldsRequired') }}
                </p>
                <p
                  id="titleLabel"
                  class="secondary--text text-md-subtitle-2 font-weight-medium"
                >
                  {{ $t('paymentLinkCreate.card.productTitle') }}&nbsp;*
                </p>
                <v-text-field
                  id="titleField"
                  v-model="title"
                  outlined
                  rounded
                  dense
                  :rules="[
                    formRules.requiredRule,
                    (title) =>
                      (!!title && title.length <= 100) ||
                      $t('paymentLinkCreate.card.productTitleLengthCond'),
                  ]"
                  aria-labelledby="titlelabel"
                  :placeholder="
                    $t('paymentLinkCreate.card.productTitlePlaceholder')
                  "
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12">
                <p
                  id="amountLabel"
                  class="secondary--text text-md-subtitle-2 font-weight-medium"
                >
                  {{ $t('paymentLinkCreate.card.productAmount') }}&nbsp;*
                </p>
                <v-text-field
                  id="amountField"
                  v-model="amount"
                  type="number"
                  outlined
                  rounded
                  min="0"
                  dense
                  :rules="[
                    formRules.requiredRule,
                    (amount) =>
                      formRules.checkPositiveAmount(amount) ||
                      $t('formRules.positiveValue'),
                    formRules.checkWithComission,
                  ]"
                  aria-label="amountLabel"
                  placeholder="100"
                >
                  <template v-slot:append
                    ><span class="mt-1 secondary--text font-weight-bold"
                      >USD</span
                    ></template
                  >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="12">
                <p
                  id="memoLabel"
                  class="secondary--text text-md-subtitle-2 font-weight-medium"
                >
                  {{ $t('paymentLinkCreate.card.productMemo') }}
                </p>
                <v-textarea
                  id="memoField"
                  v-model="memo"
                  :class="memo.length > 250 ? 'memo__error' : 'memo'"
                  no-resize
                  counter
                  :counter-value="(memo) => `${memo.length} / 250`"
                  outlined
                  rounded
                  dense
                  rows="4"
                  :color="memo.length > 250 ? 'primary' : 'secondary'"
                  :rules="[
                    (text) =>
                      text.length <= 250 ||
                      $t('paymentLinkCreate.card.productMemoError'),
                  ]"
                  aria-label="memoLabel"
                  :placeholder="
                    $t('paymentLinkCreate.card.productMemoPlaceholder')
                  "
                >
                </v-textarea>
              </v-col>
            </v-row>

            <v-row justify="space-between" align="center">
              <v-col cols="12" sm="6">
                <p
                  class="secondary--text font-weight-medium text-sm-subtitle-2 mb-0"
                >
                  {{ $t('paymentLinkCreate.card.linkExpireTitle') }}
                </p>
              </v-col>
              <v-col cols="12" sm="2">
                <v-switch
                  v-model="showExpire"
                  color="primary"
                  class="mt-0"
                ></v-switch>
              </v-col>
            </v-row>

            <div v-show="showExpire" id="expire-options" class="flex-column">
              <p
                class="secondary--text font-weight-medium text-sm-subtitle-2 ma-0"
              >
                {{ $t('paymentLinkCreate.card.linkDuration') }}
              </p>
              <v-row class="mb-4">
                <v-radio-group
                  v-model="selectedExpire"
                  row
                  class="full-width-group"
                  :rules="[
                    (expire) =>
                      !showExpire ||
                      expire > -1 ||
                      $t('paymentLinkCreate.card.noExpireError'),
                  ]"
                >
                  <v-col
                    v-for="n in expiredOptions.length"
                    :key="n"
                    cols="12"
                    sm="4"
                    class="pa-1"
                    @click="selectedExpire = n - 1"
                  >
                    <ExpireButton
                      v-bind="expiredOptions[n - 1]"
                      :is-selected="selectedExpire === n - 1"
                    />
                  </v-col>
                </v-radio-group>
              </v-row>
            </div>
            <div class="d-flex justify-center">
              <v-btn id="submit-btn" rounded @click="submitLink"
                >{{
                  editing
                    ? $t('paymentLinkCreate.card.editBtn')
                    : $t('paymentLinkCreate.card.createBtn')
                }}
              </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="4" xl="3">
        <ComissionMessage
          id="comissionBox"
          :final-amount="finalAmount > 0 ? finalAmount : 0"
          :comission="comission"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import ComissionMessage from './ComissionMessage'
import { expiredOptions } from '~/utils/misc-constants'
import { checkPositiveAmount } from '~/utils/formValidationFuncs'

dayjs.extend(utc)
dayjs.extend(timezone)

export default {
  name: 'PaymentLinkCard',
  components: { ComissionMessage },
  props: {
    originalLink: {
      type: Object,
      required: false,
      default: () => {
        return {}
      },
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFormValid: false,
      title: this.originalLink.title || '',
      amount: this.originalLink.amount || '',
      memo: this.originalLink.memo || '',
      showExpire: !!this.originalLink.expiration_date,
      selectedExpire: -1,
      // !TODO Change this comission value when it is available
      comission: 2,
      formRules: {
        requiredRule: (amount) => !!amount || this.$t('formRules.required'),
        checkPositiveAmount,
        checkWithComission: (amount) =>
          (!!amount && this.finalAmount > 0) ||
          this.$t('paymentLinkCreate.card.comissionError'),
      },
      expiredOptions,
    }
  },
  computed: {
    finalAmount() {
      return this.amount - this.comission
    },
  },
  mounted() {
    this.expiredOptions.forEach((option, i) => {
      option.title = this.$t(
        `paymentLinkCreate.card.expireOptions.option${i + 1}`
      )
    })
  },
  methods: {
    submitLink() {
      if (this.$refs.form.validate()) {
        const linkData = {
          title: this.title,
          amount: this.amount,
          memo: this.memo,
          finalAmount: this.finalAmount,
        }
        // If its being edited, the id is needed for the request
        if (this.editing) {
          linkData.link = this.originalLink.link
        }
        // If it has expiration date, set the time to the end of the day
        if (this.showExpire) {
          const expirationDate = this.expiredOptions[this.selectedExpire].date
          linkData.expiration_date = expirationDate
            .tz(dayjs.tz.guess()) // This sets the current user TZ to the expire date
            .set('hour', 23)
            .set('minute', 59)
            .set('second', 59)
            .format()
        }
        this.$emit('onSubmitLink', linkData, this.editing)
      }
    },
  },
}
</script>
