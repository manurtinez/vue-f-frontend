<template>
  <v-container>
    <v-row>
      <v-col v-for="option in shareOptions" :key="option.title">
        <a
          class="no-decorate"
          :href="
            option.generateLink(
              linkData.title,
              linkData.amount,
              `${$config.pageDomain}pay/${linkData.link}` // ! This link is subject to change
            )
          "
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-btn fab large depressed outlined color="secondary">
            <v-icon>{{ option.logo }}</v-icon>
          </v-btn>
        </a>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { shareOptions } from '@/utils/misc-constants'

export default {
  name: 'ShareLinkNav',
  props: {
    linkData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      shareOptions,
    }
  },
}
</script>
