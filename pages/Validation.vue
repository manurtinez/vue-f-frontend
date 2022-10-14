<template>
  <component :is="currentComponent"></component>
</template>

<script>
import { mapMutations } from 'vuex'
import EmailError from '@/components/UI/Emails/EmailError'
import EmailSuccess from '@/components/UI/Emails/EmailSuccess'
import {
  SET_VALIDATION_FAILED,
  SET_VALIDATION_SUCCESS,
} from '~/store/mutationTypes'

export default {
  layout: 'ValidationLayout',
  middleware: ['validationGuard'],
  data() {
    return {
      currentComponent: '',
    }
  },
  beforeMount() {
    const queryHash = this.$route.query.q
    if (queryHash) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.loadingTimeout = setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 5000)
      this.validateHash(queryHash)
    }
  },
  methods: {
    validateHash(hash) {
      this.$publicAxios
        .get(`${this.$urls.VALIDATE_REGISTER}?q=${hash}`)
        .then((res) => {
          if (res.status === 201) {
            // Change template acordingly
            this.setValidationSuccess()
            this.currentComponent = EmailSuccess
          } else {
            throw new Error(
              'Error in the hash validation request: ',
              res.status
            )
          }
        })
        .catch((err) => {
          // Change template acordingly
          console.error(err)
          this.setValidationFailed()
          this.currentComponent = EmailError
        })
    },
    ...mapMutations({
      setValidationSuccess: SET_VALIDATION_SUCCESS,
      setValidationFailed: SET_VALIDATION_FAILED,
    }),
  },
}
</script>

<style scoped>
.sent-description {
  width: 400px;
}
</style>
