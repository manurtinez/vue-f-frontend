<template>
  <v-container>
    <v-row justify="end">
      <!-- TODO change logo for the real one when available -->
      <v-col md="4" class="main-logo centered">
        <v-icon role="img" aria-label="Logo de Foxtrot">mdi-account</v-icon>
      </v-col>
      <v-col md="4" class="login-btn">
        <NuxtLink to="/register">
          <v-btn text small color="primary">CREAR CUENTA</v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
    <v-row justify="center">
      <p
        class="text-center text-lg-h5 font-weight-bold font-weight-black secondary--text"
      >
        Ingresar
      </p></v-row
    >
    <v-row justify="center">
      <LoginForm @onLogin="login" />
      <p v-show="error" id="errorMsg" class="secondary--text text-md-caption">
        Hubo algún error al iniciar sesión. Por favor, intentá de nuevo
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'LoginLayout',
  name: 'Login',
  data() {
    return {
      error: false,
    }
  },
  methods: {
    async login(userData) {
      const loginData = await this.performLogin(userData)
      if (loginData && loginData.status === 200) {
        if (!loginData.data.is_profile_completed) {
          this.$router.push({ path: '/completeregister' })
        } else {
          this.$router.push({ path: '/' })
        }
      } else {
        this.error = true
      }
    },
    ...mapActions({
      performLogin: 'userStore/performLogin',
    }),
  },
}
</script>
