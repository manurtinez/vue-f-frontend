<template>
  <v-container
    :class="
      !$vuetify.breakpoint.mobile
        ? 'inner-container'
        : 'inner-container__mobile'
    "
  >
    <v-row justify="start">
      <p class="secondary--text text-h6 font-weight-bold">
        {{ $t('paymentLinkList.title') }}
      </p>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="12" sm="4">
        <v-select
          id="filter-select"
          v-model="filters.statusFilter"
          :items="filterItems"
          item-text="text"
          item-value="value"
          rounded
          outlined
          dense
          background-color="white"
          color="primary"
          :menu-props="{ bottom: true, offsetY: true }"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          id="invoiceField"
          background-color="white"
          outlined
          rounded
          dense
          :placeholder="$t('paymentLinkList.idFilterPlaceholder')"
          @input="setInvoice"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <NuxtLink to="/paymentlink/create">
          <v-btn large rounded color="primary" class="create-btn"
            >{{ $t('paymentLinkList.createButton') }}
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
    <PaymentLinkTable :filters="filters" />
  </v-container>
</template>

<script>
import { linkStatuses } from '~/utils/misc-constants'

export default {
  name: 'PaymentLinkList',
  data() {
    return {
      filterItems: [
        { text: this.$t('paymentLinkList.filterItems.all'), value: '' },
        {
          text: this.$t('paymentLinkList.filterItems.expired'),
          value: linkStatuses.expired,
        },
        {
          text: this.$t('paymentLinkList.filterItems.canceled'),
          value: linkStatuses.canceled,
        },
        {
          text: this.$t('paymentLinkList.filterItems.paid'),
          value: linkStatuses.paid,
        },
        {
          text: this.$t('paymentLinkList.filterItems.active'),
          value: linkStatuses.active,
        },
      ],
      filters: { statusFilter: '', invoiceFilter: '' },
      timeout: null,
    }
  },
  destroyed() {
    if (this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    setInvoice(invoice) {
      // ! Here, functionality to cancel pending calls can be implemented
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(
        () => (this.filters.invoiceFilter = invoice),
        500
      )
    },
  },
  template: 'default',
}
</script>

<style scoped>
.create-btn {
  width: 100%;
}
</style>
