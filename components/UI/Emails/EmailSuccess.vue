<template>
  <v-container>
    <Portal to="centered-icon">
      <v-icon
        size="100px"
        class="centered-icon"
        role="img"
        aria-label="Logo de correo"
        color="green lighten-1"
        >mdi-email-outline</v-icon
      >
    </Portal>
    <v-row justify="center" class="mt-6 mb-6">
      <p class="text-center text-md-h5 secondary--text font-weight-bold">
        ¡Hemos validado tu mail!
      </p>
    </v-row>
    <v-row justify="center" class="mb-12">
      <p class="text-center text-md-subtitle-1 sent-description">
        Ahora podrás ingresar a tu cuenta para activarla
      </p>
    </v-row>
    <v-row justify="center">
      <NuxtLink to="/login">
        <v-btn rounded color="primary" large>INGRESAR</v-btn>
      </NuxtLink>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EmailSuccess',
  layout: 'ValidationLayout',
}
</script>

<style scoped>
.sent-description {
  width: 400px;
}
</style>
