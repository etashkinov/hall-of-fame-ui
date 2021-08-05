<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="300px"
  >
    <template #activator="{ on, attrs }">
      <v-chip
        class="ma-1"
        outlined
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        New
      </v-chip>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add new skill</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-combobox
                v-model="skill"
                :items="items"
                label="Skill"
                required
                @click="load"
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
                    v-model="since"
                    label="Since"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="since"
                  active-picker="YEAR"
                  @input="dateMenu = false"
                />
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :loading="saving"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import levels from './levels'

  export default {
    name: 'NewSkill',
    props: {
      personId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        dialog: false,
        skill: '',
        dicts: [],
        level: levels[1].title,
        dateMenu: false,
        since: null,
        levelTitles: levels.map(l => l.title),
        saving: false,
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
          this.dicts = await this.$api.dictionaries.get('skills')
        }
      },
      async save () {
        this.saving = true
        let dict = Object.values(this.dicts).find(d => d.name === this.skill)
        if (!dict) {
          dict = await this.$api.dictionaries.add('skills', this.skill, '')
        }
        const level = levels.findIndex(l => l.title === this.level)
        this.$store.dispatch('persons/addDict', {
          personId: this.personId,
          type: 'skills',
          dict: {
            dictId: dict.dictId,
            since: this.$moment(this.since),
            level,
          },
        })
        this.saving = false
        this.dialog = false
      },
    },
  }
</script>
