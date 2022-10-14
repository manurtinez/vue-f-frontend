<template>
  <v-form ref="form" v-model="isFormValid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p
            id="emailLabel"
            class="secondary--text text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('register.registerForm.emailTitle') }}
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
          >
          </v-text-field>
          <p
            id="passwordLabel"
            class="secondary--text text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('register.registerForm.passwordTitle') }}
          </p>
          <v-text-field
            v-model="password"
            type="password"
            outlined
            hide-details
            rounded
            dense
            :rules="[
              formRules.passwordLength,
              formRules.passwordCase,
              formRules.passwordSpecial,
              formRules.passwordNumber,
            ]"
            aria-label="passwordLabel"
          ></v-text-field>
          <PasswordRules :pass="password" />
          <p
            id="rePasswordLabel"
            class="secondary--text text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('register.registerForm.rePasswordTitle') }}
          </p>
          <v-text-field
            v-model="rePassword"
            type="password"
            outlined
            rounded
            dense
            :rules="[doPasswordsMatch]"
            aria-label="rePasswordLabel"
          ></v-text-field>
          <v-checkbox
            v-model="termsCheck"
            color="primary"
            :rules="[
              (check) =>
                !!check || $t('register.registerForm.acceptTermsError'),
            ]"
          >
            <template #label>
              <!-- TODO add real terms and conditions link  -->
              <i18n
                class="text-md-caption font-weight-bold"
                path="register.registerForm.acceptTermsText"
                tag="span"
              >
                <template #termsLink>
                  <!-- TODO add the real support link when available -->
                  <a class="primary--text" href="">{{
                    $t('register.registerForm.acceptTermsLinkTitle')
                  }}</a>
                </template>
              </i18n>
            </template>
          </v-checkbox>
          <div class="d-flex justify-center">
            <v-btn
              :disabled="!isFormValid"
              rounded
              color="primary"
              @click="submitRegister"
              >{{ $t('register.registerForm.createAccountBtn') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {
  email,
  passwordLength,
  passwordCase,
  passwordSpecial,
  passwordNumber,
} from '@/utils/formValidationFuncs'

export default {
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      termsCheck: false,
      isFormValid: false,
      formRules: {
        email,
        passwordLength,
        passwordCase,
        passwordSpecial,
        passwordNumber,
      },
    }
  },
  computed: {
    doPasswordsMatch() {
      return (
        this.password === this.rePassword ||
        this.$t('register.registerForm.passMatchError')
      )
    },
  },
  methods: {
    submitRegister() {
      if (this.$refs.form.validate()) {
        this.$emit('onRegister', {
          email: this.email,
          password: this.password,
          check_password: this.rePassword,
        })
      }
    },
  },
}
</script>
