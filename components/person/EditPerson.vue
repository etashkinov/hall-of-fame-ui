<template>
  <v-btn
    icon
    x-small
    color="muted"
    title="Edit name"
    @click="opened = true"
  >
    <v-icon
      x-small
      right
    >
      mdi-pencil
    </v-icon>
    <form-dialog
      v-model="opened"
      :title="`Edit ${person.name}`"
      :on-save="save"
      width="600px"
    >
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Name"
          required
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="description"
          label="Description"
          rows="7"
        />
      </v-col>
    </form-dialog>
  </v-btn>
</template>

<script>
  import FormDialog from '../base/FormDialog.vue'

  export default {
    name: 'EditPerson',
    components: { FormDialog },
    props: {
      person: {
        type: Object,
        required: true,
      },
    },
    data () {
      return {
        opened: false,
        name: this.person.name,
        description: this.person.description,
      }
    },
    methods: {
      save () {
        return this.$store.dispatch('persons/updatePerson', { id: this.person.id, name: this.name, description: this.description })
      },
    },
  }
</script>
