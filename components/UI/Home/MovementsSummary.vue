<template>
  <v-container>
    <v-row class="centered mb-4" justify="space-between" align="center">
      <p class="text--secondary font-weight-bold text-subtitle-2 ma-0">
        {{ $t('home.movementsSummary.title') }}
      </p>
      <!--      TODO This link will redirect to movements page when available-->
      <NuxtLink class="no-decorate" to="">
        <v-btn text small color="primary"
          >{{ $t('home.movementsSummary.listBtn') }}
        </v-btn>
      </NuxtLink>
    </v-row>
    <v-row>
      <LastMovementsCard />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MovementsSummary',
}
</script>
