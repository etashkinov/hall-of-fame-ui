<template>
  <v-btn
    class="mt-n2"
    elevation="1"
    fab
    small
    title="Add new person"
    @click="opened = true"
  >
    <v-icon>
      mdi-plus
    </v-icon>
    <form-dialog
      v-model="opened"
      title="New person"
      button="New person"
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

      <v-col cols="6">
        <dict-combobox
          ref="position"
          label="Position"
          type="positions"
          required
        />
        <dict-combobox
          ref="team"
          label="Team"
          type="teams"
          required
        />
        <date-input
          v-model="since"
          label="Since"
        />
      </v-col>
      <v-col cols="6">
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
  import DateInput from '../base/DateInput.vue'
  import FormDialog from '../base/FormDialog.vue'
  import DictCombobox from './DictCombobox.vue'

  export default {
    name: 'PersonEditDialog',
    components: { DateInput, DictCombobox, FormDialog },
    data () {
      return {
        opened: false,
        name: '',
        description: '',
        since: this.$moment().format('YYYY-MM-DD'),
      }
    },
    methods: {
      async save () {
        const position = await this.$refs.position.getValue()
        const team = await this.$refs.team.getValue()
        const person = await this.$store.dispatch('persons/addPerson', { name: this.name, description: this.description })
        await this.$store.dispatch('persons/addDict', {
          personId: person.id,
          type: 'positions',
          dict: {
            dictId: position.dictId,
            since: this.$moment(this.since),
            teamId: team.dictId,
          },
        })
      },
    },
  }
</script>
