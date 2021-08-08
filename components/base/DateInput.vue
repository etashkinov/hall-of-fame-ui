<template>
  <v-menu
    ref="date-picker"
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
    z-index="1000"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="inputVal"
        :label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="inputVal"
      active-picker="YEAR"
      @input="dateMenu = false"
    />
  </v-menu>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'DateInput',
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: false,
        default: '',
      },
    },
    data () {
      return {
        dateMenu: false,
      }
    },
    computed: {
      inputVal: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },
  })
</script>
