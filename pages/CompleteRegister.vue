<template>
  <v-container>
    <v-row justify="start">
      <v-btn text small color="secondary">
        <v-icon>mdi-arrow-left</v-icon>
        Volver
      </v-btn>
    </v-row>
    <v-row justify="center" class="ma-10">
      <div
        class="secondary--text text-center text-sm-h5 text-sm-h5 font-weight-bold"
      >
        ¡Te damos la bienvenida a tu activación de cuenta!
      </div>
    </v-row>
    <v-row justify="center" class="ma-10"
      ><p class="text-center text-md-body-1">
        Vamos a pedirte algunos datos personales para poder asegurarte la
        seguridad de tus cuentas. El proceso toma menos de 5 minutos.
      </p></v-row
    >
    <v-row justify="center" class="ma-10">
      <!-- Use of dynamic component will support adding Country and Jumio components in the future -->
      <component
        :is="currentFormComponent"
        @submitPersonalInfo="submitPersonalInfo"
      ></component>
    </v-row>
    <v-row justify="center">
      <v-btn text color="primary">Volver al panel</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import PersonalInfoForm from '@/components/forms/register/PersonalInfoForm'
import { mapMutations, mapState } from 'vuex'
import { UPDATE_LOGGED_USER } from '~/store/userStore/mutationTypes'

export default {
  layout: 'LoginLayout',
  data() {
    return {
      currentFormComponent: PersonalInfoForm,
    }
  },
  computed: {
    ...mapState({
      loggedUserId: (state) => state.userStore.loggedUser.id,
    }),
  },
  methods: {
    async submitPersonalInfo(userData) {
      // ! call to finishRegister() should be moved once we have the Jumio part
      try {
        const response = await this.$axios.patch(
          `${this.$urls.SUBMIT_USER}${this.loggedUserId}/`,
          userData
        )
        if (response && response.status === 200) {
          this.updateLoggedUser(response.data)
          this.$router.push({ path: '/' })
        } else {
          throw new Error(
            `There was a problem finishing the register of the user --> ${response}`
          )
        }
      } catch (err) {
        console.error(err)
      }
    },
    ...mapMutations({
      updateLoggedUser: `userStore/${UPDATE_LOGGED_USER}`,
    }),
  },
}
</script>

<style></style>
