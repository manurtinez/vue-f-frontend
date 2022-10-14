<template>
  <div>
    <v-row>
      <v-sheet color="white" rounded="xl" width="100%">
        <p v-if="linkList.results.length === 0" class="ma-2 mb-2 text-center">
          {{ $t('paymentLinkList.table.noResults') }}
        </p>
        <v-simple-table v-else class="round-all-borders" width="100%">
          <template v-slot:default>
            <tbody>
              <tr v-for="item in linkList.results" :key="item.id">
                <td class="d-flex justify-start align-center">
                  <p
                    id="invoice-field"
                    class="primary--text font-weight-bold text-subtitle-2 mb-2 ml-4 mt-2"
                  >
                    #{{ item.invoice_number }}
                  </p>
                  <p
                    id="title-field"
                    class="font-weight-bold text-subtitle-2 mb-2 ml-8 mt-2"
                  >
                    {{ item.title }}
                  </p>
                </td>
                <td>
                  <LinkStatus :item="item" :today="today" />
                </td>
                <td>
                  <b>{{ item.amount }}</b> {{ item.currency }}
                </td>
                <td width="20px">
                  <v-tooltip
                    max-width="300"
                    bottom
                    :disabled="!item.memo"
                    content-class="memo-tooltip"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="primary"
                        :style="{ opacity: item.memo ? '1' : '0.6' }"
                        v-bind="attrs"
                        v-on="on"
                        >mdi-alert-circle-outline</v-icon
                      >
                    </template>
                    <span id="tooltip-text">{{ item.memo }}</span>
                  </v-tooltip>
                </td>
                <td>
                  <!-- TODO Ask for this designs -->

                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn id="menu-btn" icon v-bind="attrs" v-on="on">
                        <v-icon large>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-if="item.status === 'Active'">
                        <v-list-item-title>
                          <v-btn
                            id="edit-btn"
                            small
                            color="primary"
                            @click="recreateOrEditLink(item, true)"
                            >Modificar
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="item.status === 'Active'">
                        <v-list-item-title>
                          <v-btn
                            id="cancel-btn"
                            small
                            color="primary"
                            @click="cancelLink(item)"
                            >Cancelar
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>
                          <v-btn
                            id="recreate-btn"
                            small
                            color="primary"
                            @click="recreateOrEditLink(item, false)"
                            >Reutilizar
                          </v-btn>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-sheet>
    </v-row>
    <v-row
      v-if="linkList.results.length < linkList.count"
      justify="center"
      class="mt-4"
    >
      <v-btn id="fetch-btn" text color="primary" @click="getLinks"
        >Ver más
      </v-btn>
    </v-row>
    <ConfirmDialog />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions, mapMutations, mapState } from 'vuex'
import { CLEAR_LINK_LIST } from '~/store/linkStore/mutationTypes'

export default {
  name: 'PaymentLinkTable',
  props: {
    filters: {
      type: Object,
      default: () => ({ statusFilter: '', invoiceFilter: '' }),
    },
  },
  data() {
    return {
      pageSize: 4,
      today: dayjs(),
    }
  },
  computed: {
    ...mapState({
      linkList: (state) => state.linkStore.linkList,
    }),
  },
  watch: {
    filters: {
      deep: true,
      handler({ statusFilter, invoiceFilter }) {
        // Clear existing links, and start from scratch.
        // ? Maybe implement some caching in the future?
        this.clearLinkList()
        const options = {
          limit: this.pageSize,
          offset: 0,
          expired: false, // By default, this is false, it only takes efect on "expired" and "active" filters
        }
        if (statusFilter) {
          if (statusFilter === 'EXP') {
            options.expired = true
          } else {
            options.status = statusFilter
          }
        }
        if (invoiceFilter) options.invoice = invoiceFilter
        this.getLinks(options)
      },
    },
  },
  mounted() {
    this.clearLinkList()
    const options = {
      limit: this.pageSize,
      offset: 0,
    }
    this.getLinks(options)
  },
  methods: {
    async cancelLink(link) {
      // TODO ask for this alert designs as well
      if (
        await this.$root.$refs.ConfirmDialog.open(
          'Cancelar link',
          `¿Estás seguro que queres cancelar el link para ${link.title}?`
        )
      ) {
        const newLink = { ...link, new_status: 'Canceled' }
        if (await this.modifyLink(newLink)) {
          this.$root.$refs.ConfirmDialog.open('Link cancelado con éxito', '', {
            onlyAccept: true,
            rightBtnText: 'OK',
          })
        } else {
          this.$root.$refs.ConfirmDialog.open(
            'Ups!',
            `Hubo algún error al eliminar el link para ${link.title}. Por favor, intentá de nuevo`,
            {
              onlyAccept: true,
              rightBtnText: 'OK',
            }
          )
        }
      }
    },
    // Param {boolean} editing:
    // If false, new link is created.
    // If true, existing link is modified
    recreateOrEditLink(link, editing) {
      this.$router.push({
        name: 'PaymentLink-Create',
        params: {
          originalLink: link,
          editing,
        },
      })
    },
    ...mapActions({
      getLinks: 'linkStore/getLinks',
      modifyLink: 'linkStore/modifyLink',
    }),
    ...mapMutations({
      clearLinkList: `linkStore/${CLEAR_LINK_LIST}`,
    }),
  },
}
</script>

<style scoped>
.memo-tooltip {
  color: black;
  background-color: #eee9f0;
}
</style>
