<template>
  <div>
    <v-chip
      v-if="item.status === 'Expired'"
      id="expired"
      outlined
      color="primary"
      text-color="#D92A5F"
      >{{ $t('linkStatus.expired') }}
    </v-chip>
    <v-chip
      v-else-if="item.status === 'Canceled'"
      id="canceled"
      outlined
      color="lightGrey"
      text-color="#7B848F"
      >{{ $t('linkStatus.canceled') }}
    </v-chip>
    <v-chip
      v-else-if="item.status === 'Paid'"
      id="paid"
      outlined
      color="green"
      text-color="#2DABB4"
      >{{ $t('linkStatus.paid') }}
    </v-chip>
    <span v-else> {{ expireAsString(item.expiration_date, 7) }} </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { expireAsString } from '~/utils/misc-funcs'

export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
    today: {
      type: Object,
      default: () => dayjs(),
    },
  },
  methods: {
    expireAsString,
  },
}
</script>

<style scoped>
#expired {
  background-color: #ffe5ed !important;
}
#canceled {
  background-color: #dce4ee !important;
}
#paid {
  background-color: #38cfda1a !important;
}
</style>
