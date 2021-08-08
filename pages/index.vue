<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        v-for="personId in persons"
        :key="personId"
        cols="12"
        sm="6"
        lg="4"
      >
        <person-card :person-id="personId" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PersonCard from '~/components/person/PersonCard'

  export default {
    name: 'Dashboard',
    components: {
      PersonCard,
    },
    computed: {
      persons () {
        return Object.keys(this.$store.state.persons.persons)
      },
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.$store.dispatch('persons/loadPersons')
        this.$store.dispatch('teams/load')
      },
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
