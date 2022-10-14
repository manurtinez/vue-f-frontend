<template>
  <v-sheet color="white" rounded="xl" width="100%">
    <v-simple-table class="round-all-borders">
      <template v-slot:default>
        <tbody>
          <tr class="round-top-borders">
            <ProfileImage :image-url="currentUser.profile_image_url" />
          </tr>
          <v-divider></v-divider>
          <tr class="d-flex justify-space-between">
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.userTitle') }}
            </p>
            <p id="usernameField" class="mt-3 mb-3 mr-10">
              {{ currentUser.username }}
            </p>
          </tr>
          <v-divider></v-divider>
          <tr class="d-flex justify-space-between">
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.emailTitle') }}
            </p>
            <p id="emailField" class="mt-3 mb-3 mr-10">
              {{ currentUser.email }}
            </p>
          </tr>
          <v-divider></v-divider>
          <tr class="d-flex justify-space-between">
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.userFullNameTitle') }}
            </p>
            <p id="fullnameField" class="mt-3 mb-3 mr-10">
              {{ currentUser.fullname }}
            </p>
          </tr>
          <v-divider></v-divider>
          <tr class="d-flex justify-space-between">
            <!-- ! If there is more ID types in the future, this should change -->
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.dniTitle') }}
            </p>
            <p id="dniField" class="mt-3 mb-3 mr-10">
              DNI {{ currentUser.dni }}
            </p>
          </tr>
          <v-divider></v-divider>
          <tr class="d-flex justify-space-between">
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.nationalityTitle') }}
            </p>
            <p id="nationalityField" class="mt-3 mb-3 mr-10">
              {{ currentUser.nationality_display }}
            </p>
          </tr>

          <!-- TODO this row will be commented until we have access to the user manu information -->
          <!-- <v-divider></v-divider>
          <tr class="d-flex justify-space-between">
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.manuTitle') }}
            </p>
            <p id="nationalityField" class="mt-3 mb-3 mr-10">
              {{ currentUser.manuUsername }}
            </p>
          </tr> -->

          <v-divider></v-divider>
          <tr class="d-flex justify-space-between round-bottom-borders">
            <p class="mt-3 mb-3 ml-10 secondary--text text-subtitle-2">
              {{ $t('profile.accountDataCard.passwordTitle') }}
            </p>
            <v-btn class="mt-1 mr-10" text color="primary"
              >{{ $t('profile.accountDataCard.changePasswordBtn') }}
            </v-btn>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-sheet>
</template>

<script>
import ProfileImage from './ProfileImage'

export default {
  name: 'AccountDataCard',
  components: { ProfileImage },
  props: {
    currentUser: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>
