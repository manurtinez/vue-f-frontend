<template>
  <v-form ref="form" v-model="isFormValid" class="loginForm">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p
            id="emailLabel"
            class="secondary--text text-md-subtitle-1 font-weight-bold"
          >
            Email
          </p>
          <v-text-field
            id="emailField"
            v-model="email"
            type="email"
            outlined
            rounded
            dense
            :rules="[formRules.email]"
            aria-labelledby="emailLabel"
            placeholder="juanperez@gmail.com"
          >
          </v-text-field>
          <p
            id="passwordLabel"
            class="secondary--text text-md-subtitle-1 font-weight-bold"
          >
            Contraseña
          </p>
          <v-text-field
            v-model="password"
            type="password"
            outlined
            rounded
            dense
            :rules="[(p) => !!p || 'La contraseña es requerida']"
            aria-label="passwordLabel"
            placeholder="*******"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn
              :disabled="!isFormValid"
              rounded
              color="primary"
              @click="submitLogin"
              >INGRESAR</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { email } from '@/utils/formValidationFuncs'
export default {
  data() {
    return {
      email: '',
      password: '',
      isFormValid: false,
      formRules: {
        email,
      },
    }
  },

  methods: {
    submitLogin() {
      if (this.$refs.form.validate()) {
        this.$emit('onLogin', {
          username: this.email,
          password: this.password,
        })
      }
    },
  },
}
</script>

<style scoped>
.loginForm {
  width: 80%;
}
</style>
