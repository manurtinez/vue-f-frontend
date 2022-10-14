<template>
  <v-sheet color="white" rounded="xl" width="100%">
    <p v-if="movementList.results.length === 0" class="ma-2 mb-2 text-center">
      {{ $t('home.movementsSummary.lastMovementsCard.noResults') }}
    </p>
    <v-simple-table v-else class="round-all-borders" width="100%">
      <template v-slot:default>
        <tbody>
          <tr
            v-for="movement in movementList.results.slice(0, 3)"
            :key="movement.id"
          >
            <td class="pr-0 mt-4 mb-4 icon-cell">
              <v-sheet
                :color="getBgColor(movement.type)"
                rounded="circle"
                width="40px"
                height="40px"
                class="ma-0 pa-0"
              >
                <v-icon class="centered-icon" :color="getColor(movement.type)">
                  {{ getIcon(movement.type) }}
                </v-icon>
              </v-sheet>
            </td>
            <td class="pl-0">
              <p
                class="mb-0 mt-4 text-subtitle-2 font-weight-medium truncated-title"
              >
                {{ getTitle(movement) }}
              </p>
              <p
                class="text-caption font-weight-medium grey--text text--darken-2 text-capitalize"
              >
                {{ getLocalizedDate(movement.date, $i18n.locale) }}
              </p>
            </td>
            <td>
              <p id="movement-amount" class="font-weight-bold mb-0">
                {{ getAmount(movement) }}
                <span class="font-weight-medium grey--text text--darken-2">{{
                  movement.currency
                }}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getLocalizedDate } from '~/utils/misc-funcs'

export default {
  name: 'LastMovementsCard',
  computed: {
    ...mapState({
      movementList: (state) => state.movementStore.movementList,
    }),
  },
  mounted() {
    if (this.movementList.results.length === 0) {
      this.getMovements()
    }
  },
  methods: {
    getIcon(type) {
      return type === 'cashout'
        ? 'mdi-arrow-top-right'
        : 'mdi-arrow-bottom-left'
    },
    getColor(type) {
      return type === 'cashout' ? 'primary' : 'green'
    },
    getTitle(movement) {
      return movement.type === 'cashout'
        ? `${movement.currency} ${this.$t(
            'home.movementsSummary.lastMovementsCard.cashoutTitle'
          )}`
        : `${movement.title}`
    },
    getBgColor(type) {
      return type === 'cashout' ? '#FEEFF3' : '#DDF6F8'
    },
    getLocalizedDate,
    ...mapActions({
      getMovements: 'movementStore/getMovements',
    }),
    getAmount(movement) {
      return movement.type === 'cashout'
        ? `-${movement.amount}`
        : `+${movement.amount}`
    },
  },
}
</script>

<style scoped>
.icon-cell {
  width: 20%;
}
</style>
