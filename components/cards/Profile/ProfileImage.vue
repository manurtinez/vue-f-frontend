<template>
  <v-container
    class="d-flex round-top-borders justify-space-between align-center"
  >
    <v-img
      class="mt-3 mb-3 ml-10 d-flex flex-align rounded-circle"
      :style="{ backgroundColor: 'lightGrey' }"
      :src="imageUrl || defaultImage"
      alt="Imagen de perfil"
      max-width="100"
      max-height="100"
      :aspect-ratio="1"
    ></v-img>
    <v-btn
      class="mt-10 mb-10 mr-10 d-flex"
      text
      color="primary"
      @click="$refs.fileUploadField.click()"
      >{{ $t('profile.accountDataCard.profileImg.uploadPictureBtn') }}
    </v-btn>
    <input
      v-show="false"
      ref="fileUploadField"
      type="file"
      accept="image/jpeg, image/png"
      @change="submitImage"
    />
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
import { mapActions } from 'vuex'

export default {
  name: 'ProfileImage',
  props: {
    imageUrl: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      showAlert: false,
      alertInfo: {
        type: '',
        text: '',
      },
      alertTimeout: null,
      defaultImage: require('~/assets/icons/profile-placeholder.svg'),
    }
  },
  beforeDestroy() {
    if (this.alertTimeout) clearTimeout(this.alertTimeout)
  },
  methods: {
    async submitImage(event) {
      const image = event.target.files[0]
      if (!image) return
      // Check image size (2mb) and format (jpeg, png)
      if (
        image.size > 2000000 ||
        (image.type !== 'image/jpeg' && image.type !== 'image/png')
      ) {
        this.displayAlert(
          'error',
          this.$t('profile.accountDataCard.profileImg.sizeFormatError')
        )
      } else {
        const response = await this.uploadImage(image)
        if (response && response.status === 200) {
          this.displayAlert(
            'success',
            this.$t('profile.accountDataCard.profileImg.uploadSuccess')
          )
        } else {
          this.displayAlert(
            'error',
            this.$t('profile.accountDataCard.profileImg.uploadError')
          )
        }
      }
    },
    displayAlert(type, text) {
      this.alertInfo = {
        type,
        text,
      }
      this.showAlert = true
      this.alertTimeout = setTimeout(() => {
        this.showAlert = false
      }, 3000)
    },
    ...mapActions({
      uploadImage: 'userStore/uploadImage',
    }),
  },
}
</script>
