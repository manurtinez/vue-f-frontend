<template>
  <v-sheet color="white" rounded="xl" width="100%">
    <v-simple-table class="round-all-borders">
      <template v-slot:default>
        <tbody>
          <tr
            class="d-flex round-top-borders round-bottom-borders justify-space-between"
          >
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.securityTab.accountActionsCard.deleteAccount') }}
            </p>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-sheet>
</template>

<script>
export default {
  name: 'AccountActionsCard',
  props: {
    currentUser: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>
