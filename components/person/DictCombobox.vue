<template>
  <v-combobox
    v-model="value"
    :items="items"
    :label="label"
    :required="required"
    @click="load"
  />
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'DictCombobox',
    props: {
      label: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        value: '',
        dicts: [],
      }
    },
    computed: {
      items () {
        return this.dicts.map(d => d.name)
      },
    },
    methods: {
      async load () {
        if (!this.dicts.length) {
          this.dicts = await this.$api.dictionaries.get(this.type) || []
        }
      },
      async getValue () {
        let dict = Object.values(this.dicts).find(d => d.name === this.value)
        if (!dict) {
          dict = await this.$api.dictionaries.add(this.type, this.value, '')
        }
        return dict
      },
    },
  })
</script>
