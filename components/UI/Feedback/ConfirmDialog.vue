<template>
  <v-dialog v-model="show" persistent max-width="400" @keydown.esc="cancel">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ body }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!options.onlyAccept"
          color="primary"
          text
          @click="close(false)"
        >
          {{ options.leftBtnText }}
        </v-btn>
        <v-btn color="primary" text @click="close(true)">
          {{ options.rightBtnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data() {
    return {
      show: false,
      title: null,
      resolve: null,
      reject: null,
      body: null,
      // Default values. Options allow to render different kinds of dialog
      options: {
        onlyAccept: false,
        leftBtnText: 'Cancelar',
        rightBtnText: 'Aceptar',
      },
    }
  },
  created() {
    this.$root.$refs.ConfirmDialog = this
  },
  methods: {
    open(title, body, options) {
      this.show = true
      this.title = title
      this.body = body
      if (options) this.options = { ...options }
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close(accept) {
      this.resolve(accept)
      this.show = false
    },
  },
}
</script>
