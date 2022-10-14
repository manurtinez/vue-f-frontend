<template>
  <v-container>
    <v-row class="secondary--text text-subtitle-2 font-weight-medium"
      >{{ $t('passwordRules.title') }}
    </v-row>
    <v-row v-for="rule in rules" :key="rule.name" align="center">
      <v-icon small :color="rule.isValid ? 'green' : 'primary'">{{
        rule.isValid ? 'mdi-check' : 'mdi-close'
      }}</v-icon>
      <p
        :class="[
          rule.isValid ? 'green--text' : 'primary--text',
          ...ruleClasses,
        ]"
      >
        {{ rule.text }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import {
  passwordCase,
  passwordSpecial,
  passwordNumber,
  passwordLength,
} from '~/utils/formValidationFuncs'

export default {
  name: 'PasswordRules',
  props: {
    pass: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ruleClasses: [
        'font-weight-medium',
        'text-subtitle-2',
        'centered',
        'ma-0',
        'ml-1',
      ],
    }
  },
  computed: {
    // New rules can be added here if needed, and they will be rendered
    rules() {
      return [
        {
          name: 'uppercase',
          isValid: passwordCase(this.pass) === true,
          text: this.$t('passwordRules.uppercase'),
        },
        {
          name: 'number',
          isValid: passwordNumber(this.pass) === true,
          text: this.$t('passwordRules.number'),
        },
        {
          name: 'char',
          isValid: passwordSpecial(this.pass) === true,
          text: this.$t('passwordRules.character'),
        },
        {
          name: 'length',
          isValid: passwordLength(this.pass) === true,
          text: this.$t('passwordRules.length'),
        },
      ]
    },
  },
}
</script>
