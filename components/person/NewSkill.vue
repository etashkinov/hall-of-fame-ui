<template>
  <new-dict
    title="Add new skill"
    :on-save="save"
  >
    <v-col cols="12">
      <dict-combobox
        ref="skills"
        label="Skill"
        type="skills"
        required
      />
    </v-col>

    <v-col cols="12">
      <v-select
        v-model="level"
        :items="levelTitles"
        label="Level"
        required
      />
    </v-col>
    <v-col cols="12">
      <date-input
        v-model="since"
        label="Since"
      />
    </v-col>
  </new-dict>
</template>

<script>
  import Vue from 'vue'
  import levels from './levels'
  import NewDict from './NewDict'
  import DateInput from '~/components/base/DateInput'
  import DictCombobox from './DictCombobox'

  export default Vue.extend({
    name: 'NewSkill',
    components: {
      DictCombobox,
      DateInput,
      NewDict,
    },
    props: {
      personId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        level: levels[1].title,
        dateMenu: false,
        since: null,
        levelTitles: levels.map(l => l.title),
      }
    },
    methods: {
      async save () {
        const dict = await this.$refs.skills.getValue()
        const level = levels.findIndex(l => l.title === this.level)
        await this.$store.dispatch('persons/addDict', {
          personId: this.personId,
          type: 'skills',
          dict: {
            dictId: dict.dictId,
            since: this.$moment(this.since),
            level,
          },
        })
      },
    },
  })
</script>
