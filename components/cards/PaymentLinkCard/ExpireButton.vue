<template>
  <v-sheet
    v-ripple
    outlined
    class="d-flex pl-2 pt-2 align-center outer-button"
    height="60px"
    width="100%"
    :color="buttonColor"
  >
    <v-radio class="mb-3" :dark="isSelected" :value="id"></v-radio>
    <div class="d-flex flex-column">
      <p class="text-sm-subtitle-2 font-weight-bold mb-0" :class="textColor">
        {{ title }}
      </p>
      <p class="text-sm-caption" :class="textColor">
        {{ $d(date.toDate()) }}
      </p>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'ExpireButton',
  props: {
    isSelected: Boolean,
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      default: 'Title',
    },
    date: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    buttonColor() {
      return this.isSelected ? 'secondary' : 'white'
    },
    textColor() {
      return this.isSelected ? 'white--text' : 'secondary--text'
    },
  },
}
</script>

<style scoped>
.outer-button {
  cursor: pointer;
  border-radius: 10px;
  border-color: rgba(86, 41, 110, 0.2) !important;
  border-width: 2px;
}
</style>
