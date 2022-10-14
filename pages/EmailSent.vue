<template>
  <v-container>
    <Portal to="centered-icon">
      <v-icon
        size="100px"
        class="centered-icon"
        role="img"
        aria-label="Logo de correo"
        color="secondary"
        >mdi-email-outline
      </v-icon>
    </Portal>
    <v-row justify="center" class="mt-6 mb-6">
      <p class="text-center text-md-h5 secondary--text font-weight-bold">
        Validá tu email para ingresar
      </p>
    </v-row>
    <v-row justify="center" class="mb-12">
      <p class="text-center text-md-subtitle-1 sent-description">
        Te enviamos un correo a <b>{{ currentEmail }}</b
        >, si no lo encontrás no te olvides de chequear tu spam
      </p>
    </v-row>
    <v-row justify="center" class="mb-6">
      <p class="text-center text-md-subtitle-1">¿No lo encontrás?</p>
    </v-row>
    <v-row justify="center">
      <v-btn rounded color="primary" large @click="reSendEmail"
        >VOLVER A ENVIAR
      </v-btn>
    </v-row>
    <v-snackbar
      v-model="showAlert"
      :timeout="3000"
      absolute
      right
      bottom
      rounded="2"
      :color="alertInfo.type"
    >
      {{ alertInfo.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'ValidationLayout',
  data() {
    return {
      showAlert: false,
      alertInfo: {
        text: '',
        type: '',
      },
    }
  },
  computed: {
    ...mapState({
      currentEmail: (state) => state.userStore.currentEmail,
    }),
  },
  methods: {
    reSendEmail() {
      this.$publicAxios
        .get(`${this.$urls.RE_SEND_EMAIL}?q=${this.currentEmail}`)
        .then((res) => {
          if (res.status === 200) {
            this.alertInfo.text = 'Email enviado'
            this.alertInfo.type = 'success'
            this.showAlert = true
          } else {
            throw new Error('Error in the request:', res.status)
          }
        })
        .catch((err) => {
          this.alertInfo.text = 'Hubo algún error al enviar el mail'
          this.alertInfo.type = 'error'
          this.showAlert = true
          console.error(err)
        })
        .finally(() => {
          // Reset alert after 3 seconds
          this.alertTimeout = setTimeout(() => {
            this.alertInfo = {
              text: '',
              type: '',
            }
            this.showAlert = false
          }, 3000)
        })
    },
  },
}
</script>
