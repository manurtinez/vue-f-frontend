<template>
  <v-container>
    <Portal to="centered-icon">
      <v-icon
        size="100px"
        class="centered-icon"
        role="img"
        aria-label="Logo de correo"
        color="red lighten-1"
        >mdi-exclamation-thick</v-icon
      >
    </Portal>
    <v-row justify="center" class="mt-6 mb-6">
      <p class="text-center text-md-h5 secondary--text font-weight-bold">
        ¡Error!
      </p>
    </v-row>
    <v-row justify="center" class="mb-12">
      <p class="text-center text-md-subtitle-1 sent-description">
        Esa cuenta no existe, o el link de verificación no es válido. Por favor,
        intentá registrarte de nuevo
      </p>
    </v-row>
    <v-row justify="center">
      <NuxtLink to="/register">
        <v-btn rounded color="primary" large>REGISTRARME</v-btn>
      </NuxtLink>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EmailError',
  layout: 'ValidationLayout',
}
</script>

<style scoped>
.sent-description {
  width: 400px;
}
</style>
