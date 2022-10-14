<template>
  <v-menu
    eager
    bottom
    nudge-right="100"
    rounded="xl"
    open-on-hover
    close-delay="100"
    max-width="400"
    offset-y
    content-class="elevation-2"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        id="tooltipTitle"
        class="d-flex align-center"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="primary">mdi-alert-circle-outline</v-icon>
        <p class="mb-1 ml-2 primary--text text-subtitle-2">
          {{ tooltipTitle }}
        </p>
      </div>
    </template>
    <v-sheet id="tooltipBody" color="white">
      <!-- A slot can be passed to define the tooltip body -->
      <slot></slot>
    </v-sheet>
  </v-menu>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    tooltipTitle: {
      type: String,
      default: '',
    },
  },
}
</script>
