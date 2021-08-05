<template>
  <v-chip
    class="ma-1"
    outlined
  >
    <v-icon left>
      mdi-plus
    </v-icon>
    <slot>New</slot>
  </v-chip>
</template>

<script>
  export default {
    name: 'AddChip',
  }
</script>
