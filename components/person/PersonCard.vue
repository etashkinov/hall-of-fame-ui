<template>
  <base-material-card
    color="info"
  >
    <template #heading>
      <div class="d-flex">
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/png"
          @change="onFileChanged"
        >
        <v-avatar
          style="cursor: pointer; position: absolute; top: -27px;"
          size="128"
          class="v-card--material__avatar elevation-6"
          @click="onUpdateImage"
        >
          <v-img :src="avatar" />
        </v-avatar>
        <div class="ml-auto text-right">
          <div class="text-h3 font-weight-light">
            {{ person.name || "Person X" }}
          </div>

          <div class="text-subtitle-1 font-weight-light">
            {{ person.position || "Unknown team" }}
          </div>
          <div class="text-subtitle-1 font-weight-light">
            {{ position().name || "Unknown position" }}
          </div>
        </div>
      </div>
    </template>

    <h3 class="card-title font-weight-light mt-2 ml-2">
      Expertise
    </h3>

    <p class="d-inline-flex flex-wrap ml-2 mt-1">
      <skill
        v-for="expertise in dict('expertises')"
        :key="expertise.id"
        :level="expertise.level"
        :name="expertise.name"
        :since="formatDate(expertise.since)"
      />
      <add-chip @click="() => addNewExpertise(person.id)" />
    </p>

    <h3 class="card-title font-weight-light mt-2 ml-2">
      Skills
    </h3>

    <p class="d-inline-flex flex-wrap ml-2 mt-1">
      <skill
        v-for="skill in dict('skills')"
        :key="skill.id"
        :level="skill.level"
        :name="skill.name"
        :since="formatDate(skill.since)"
      />
      <new-skill :person-id="personId" />
    </p>
  </base-material-card>
</template>

<script>
  import { api } from '~/plugins/api'
  import Skill from '~/components/person/Skill'
  import AddChip from '~/components/person/AddChip'
  import NewSkill from '~/components/person/NewSkill'

  export default {
    name: 'PersonCard',
    components: {
      Skill,
      AddChip,
      NewSkill,
    },
    props: {
      personId: {
        type: String,
        required: true,
      },
    },
    computed: {
      person () {
        return this.$store.state.persons.persons[this.personId]
      },
      avatar () {
        return api.persons.image(this.person.id) + (this.person.imageChanged ? '?changed=true' : '')
      },
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('persons/loadDictionaries', this.personId)
      },
      onUpdateImage () {
        this.$refs.uploader.click()
      },
      onFileChanged ({ target }) {
        const { files: [image] } = target
        this.$store.dispatch('persons/updateImage', { personId: this.personId, image })
      },
      formatDate (since) {
        return this.$moment(since, 'YYYY-MM-DD').format()
      },
      dict (type) {
        const { dicts } = this.person
        return dicts ? dicts[type] : []
      },
      position () {
        const positions = [...this.dict('positions')].sort((p1, p2) => {
          if (!p1.till) return -1
          if (!p2.till) return 1
          return p1.till < p2.till ? 1 : -1
        })

        return positions.length ? positions[0] : {}
      },
    },
  }
</script>
