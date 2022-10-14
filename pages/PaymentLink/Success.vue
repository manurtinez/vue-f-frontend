<template>
  <v-container
    :class="
      !$vuetify.breakpoint.mobile
        ? 'inner-container'
        : 'inner-container__mobile'
    "
  >
    <v-row justify="start" class="mt-8 mb-8">
      <p class="secondary--text text-start text-h4 font-weight-bold mb-10">
        Empezá a cobrar
      </p>
    </v-row>
    <v-row justify="start">
      <CreatedLinkCard :created-link="createdLink" />
    </v-row>
    <v-row justify="end" align="center">
      <v-col
        cols="12"
        sm="4"
        class="d-flex justify-end"
        :offset-sm="$vuetify.breakpoint.xl ? 0 : 2"
      >
        <NuxtLink to="/paymentlink/list" class="no-decorate">
          <v-btn text color="primary">IR AL LISTADO</v-btn>
        </NuxtLink>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex justify-end">
        <NuxtLink to="/paymentlink/create" class="new-link-btn">
          <v-btn
            rounded
            x-large
            color="primary"
            class="new-link-btn no-decorate"
            >CREAR NUEVO LINK
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CreateLinkSuccess',
  middleware: ['paymentLinkGuard'],
  data() {
    return {
      createdLink: this.$route.params.createdLink,
    }
  },
}
</script>

<style scoped>
.new-link-btn {
  width: 100%;
}
</style>
