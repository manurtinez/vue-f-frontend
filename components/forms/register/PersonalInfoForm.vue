<template>
  <v-sheet rounded elevation="1" color="white" class="pa-6 centered">
    <h5
      class="secondary--text text-center text-md-h5 text-sm-h6 font-weight-bold"
    >
      {{ $t('completeRegister.personalInfoForm.title') }}
    </h5>
    <p class="text-center text-md-subtitle-1">
      {{ $t('completeRegister.personalInfoForm.title') }}
    </p>
    <v-form ref="personalForm" v-model="formValid">
      <v-row justify="start" no-gutters>
        <v-col cols="12" sm="12" lg="6">
          <p
            id="firstNameLabel"
            class="secondary--text text-left text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('completeRegister.personalInfoForm.nameTitle') }}
          </p>
          <v-text-field
            id="firstName"
            v-model="personalInfo.first_name"
            outlined
            rounded
            dense
            required
            :placeholder="
              $t('completeRegister.personalInfoForm.namePlaceholder')
            "
            aria-labelledby="firstNameLabel"
            :rules="inputRules(30)"
            class="pr-4"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <p
            id="lastNameLabel"
            class="secondary--text text-left text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('completeRegister.personalInfoForm.lastNameTitle') }}
          </p>
          <v-text-field
            id="lastName"
            v-model="personalInfo.last_name"
            outlined
            rounded
            dense
            required
            :placeholder="
              $t('completeRegister.personalInfoForm.lastNamePlaceholder')
            "
            aria-labelledby="lastNameLabel"
            :rules="inputRules(30)"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col cols="12">
          <p
            id="dniLabel"
            class="secondary--text text-left text-md-subtitle-1 font-weight-bold"
          >
            DNI
          </p>
          <v-text-field
            id="dni"
            v-model="personalInfo.dni"
            type="number"
            outlined
            rounded
            dense
            required
            placeholder="12345678"
            aria-labelledby="dniLabel"
            :rules="[
              ...inputRules(11),
              (dni) =>
                dni > 0 ||
                $t('completeRegister.personalInfoForm.dniNegativeError'),
            ]"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col cols="12">
          <p
            id="nationalityLabel"
            class="secondary--text text-left text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('completeRegister.personalInfoForm.nationalityTitle') }}
          </p>

          <!-- TODO for now, this select only has Argentina, later it will display countries parsed from backend -->
          <v-select
            id="nationality"
            v-model="personalInfo.nationality"
            :items="[{ text: 'Argentina', value: 'AR' }]"
            outlined
            rounded
            dense
            required
            :placeholder="
              $t('completeRegister.personalInfoForm.nationalityPlaceholder')
            "
            aria-labelledby="nationalityLabel"
            :rules="inputRules()"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col cols="12" sm="12" lg="6">
          <p
            id="genderLabel"
            class="secondary--text text-left text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('completeRegister.personalInfoForm.genderTitle') }}
          </p>
          <v-select
            v-model="personalInfo.gender"
            :items="selectItems"
            item-text="text"
            item-value="value"
            rounded
            outlined
            dense
            :placeholder="
              $t('completeRegister.personalInfoForm.genderPlaceholder')
            "
            required
            :rules="inputRules()"
            :class="{
              'pr-4': $vuetify.breakpoint.lgAndUp,
              'gender-select': $vuetify.breakpoint.lgAndUp,
            }"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" lg="6">
          <p
            id="birthDateLabel"
            class="secondary--text text-left text-md-subtitle-1 font-weight-bold"
          >
            {{ $t('completeRegister.personalInfoForm.birthTitle') }}
          </p>
          <template>
            <v-menu
              v-model="showDatePicker"
              transition="slide-y-transition"
              min-width="300px"
              max-width="300px"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  id="birthDate"
                  :value="formattedDate"
                  outlined
                  rounded
                  dense
                  required
                  :placeholder="
                    $t('completeRegister.personalInfoForm.birthPlaceholder')
                  "
                  aria-labelledby="birthDateLabel"
                  :rules="inputRules(10)"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="personalInfo.birth_date"
                locale="es-ar"
                :max="new Date().toISOString().slice(0, 10)"
                @input="showDatePicker = false"
              ></v-date-picker>
            </v-menu>
          </template>
        </v-col>
      </v-row>
      <v-btn
        rounded
        color="primary"
        x-large
        :disabled="!formValid"
        @click="submitPersonalInfo"
        >{{ $t('completeRegister.personalInfoForm.nextBtn') }}
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'PersonalInfoForm',
  data() {
    return {
      personalInfo: {
        first_name: '',
        last_name: '',
        dni: '',
        nationality: '',
        gender: '',
        birth_date: '',
      },
      selectItems: [
        {
          text: this.$t('completeRegister.personalInfoForm.genderOptionF'),
          value: 'F',
        },
        {
          text: this.$t('completeRegister.personalInfoForm.genderOptionM'),
          value: 'M',
        },
      ],
      formValid: false,
      showDatePicker: false,
    }
  },
  computed: {
    formattedDate() {
      if (!this.personalInfo.birth_date) return ''
      return dayjs(this.personalInfo.birth_date).format('DD/MM/YYYY')
    },
  },
  methods: {
    submitPersonalInfo() {
      if (this.$refs.personalForm.validate()) {
        // Cloning object to remove Vue functionality and submit clean data
        const submitData = { ...this.personalInfo }
        this.$emit('submitPersonalInfo', submitData)
      }
    },
    // In case the max rule doesn't apply, simply dont pass the param
    inputRules(max) {
      return [
        (input) =>
          !!input || this.$t('completeRegister.personalInfoForm.requiredError'),
        (input) => {
          if (!max) return true
          return (
            (!!input && input.length <= max) ||
            this.$t('completeRegister.personalInfoForm.maxCharsError').replace(
              /(%s)/,
              max
            )
          )
        },
      ]
    },
  },
}
</script>
