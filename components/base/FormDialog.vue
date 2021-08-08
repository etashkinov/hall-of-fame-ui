<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    :max-width="width"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <slot />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          {{ closeButton }}
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :loading="saving"
          @click="save"
        >
          {{ saveButton }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'FormDialog',
    props: {
      closeButton: {
        type: String,
        required: false,
        default: 'Close',
      },
      saveButton: {
        type: String,
        required: false,
        default: 'Save',
      },
      title: {
        type: String,
        required: true,
      },
      onSave: {
        type: Function,
        required: true,
      },
      width: {
        type: String,
        required: false,
        default: '300px',
      },
      value: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        saving: false,
      }
    },
    computed: {
      dialog: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },
    methods: {
      async save () {
        this.saving = true
        try {
          await this.onSave()
          this.dialog = false
        } finally {
          this.saving = false
        }
      },
    },
  })
</script>
