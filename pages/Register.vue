<template>
  <v-container>
    <v-row justify="end">
      <!-- TODO change logo for the real one when available -->
      <v-col md="4" class="centered"
        ><v-icon role="img" aria-label="Logo de Foxtrot"
          >mdi-account</v-icon
        ></v-col
      >
      <v-col md="4" class="centered">
        <NuxtLink to="/login">
          <v-btn text small color="primary">{{
            $t('register.loginBtn')
          }}</v-btn></NuxtLink
        ></v-col
      >
    </v-row>
    <v-row justify="center"
      ><p
        class="text-center text-lg-h5 font-weight-bold font-weight-black secondary--text"
      >
        {{ $t('register.createAccountTitle') }}
      </p>
    </v-row>
    <v-row justify="center">
      <RegisterForm @onRegister="register" />
      <p v-show="error" id="errorMsg" class="secondary--text text-md-caption">
        {{ $t('register.registerError') }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { SET_VALIDATION_PENDING } from '~/store/mutationTypes'
export default {
  layout: 'LoginLayout',
  data() {
    return {
      error: false,
    }
  },
  methods: {
    async register(userData) {
      const registerData = await this.submitRegister(userData)
      if (registerData && registerData.status === 201) {
        this.setValidationPending()
        this.$router.push({ path: '/emailsent' })
      } else {
        this.error = true
      }
    },
    ...mapActions({
      submitRegister: 'userStore/submitRegister',
    }),
    ...mapMutations({
      setValidationPending: SET_VALIDATION_PENDING,
    }),
  },
}
</script>
