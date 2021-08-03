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
            {{ person.position || "Unknown position" }}
          </div>
        </div>
      </div>
    </template>

    <h3 class="card-title font-weight-light mt-2 ml-2">
      Skills
    </h3>

    <p class="d-inline-flex flex-wrap ml-2 mt-1">
      <skill
        level="2"
        name="Java"
        :since="person.createdAt"
      />
      <skill
        level="1"
        name="Vue"
        :since="person.createdAt"
      />
      <skill
        level="0"
        name="AWS"
        :since="person.createdAt"
      />
      <v-chip
        class="ma-1"
        outlined
        @click="() => addNewSkill(person.id)"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        New
      </v-chip>
    </p>

    <h3 class="card-title font-weight-light mt-2 ml-2">
      Expertise
    </h3>

    <p class="d-inline-flex font-weight-light ml-2 mt-1">
      Store integrations, Quote calculations, Production, Infrastructure, 3D Analysis in Lambda
    </p>
  </base-material-card>
</template>

<script>
  import moment from 'moment'
  import { api } from '~/plugins/api'
  import Skill from '~/components/person/Skill'

  export default {
    name: 'PersonCard',
    components: {
      Skill,
    },
    props: {
      person: {
        type: Object,
        required: true,
      },
    },
    data () {
      const since = moment(this.person.createdAt).fromNow()
      const avatar = api.persons.image(this.person.id) + (this.person.imageChanged ? '?changed=true' : '')
      return ({
        since,
        avatar,
      })
    },
    methods: {
      onUpdateImage () {
        this.$refs.uploader.click()
      },
      onFileChanged ({ target }) {
        const { files: [image] } = target
        this.$store.dispatch('persons/updateImage', { personId: this.person.id, image })
      },
    },
  }
</script>
