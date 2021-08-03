<template>
  <v-chip
    class="ma-1"
    :color="color"
    text-color="white"
    :title="`${title} (${fromWhen})`"
  >
    <v-icon left>
      {{ icon }}
    </v-icon>
    {{ name }}
  </v-chip>
</template>

<script>
  import moment from 'moment'

  const TYPES = {
    0: {
      icon: 'mdi-ship-wheel',
      color: 'blue',
      title: 'Explorer',
    },
    1: {
      icon: 'mdi-fireplace',
      color: 'green',
      title: 'Habitant',
    },
    2: {
      icon: 'mdi-head-snowflake-outline',
      color: 'purple',
      title: 'Guru',
    },
  }

  export default {
    name: 'Skill',
    props: {
      level: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      since: {
        type: String,
        required: true,
      },
    },
    data () {
      const type = TYPES[this.level]
      const fromWhen = moment(this.since).fromNow()
      return ({
        ...type,
        fromWhen,
      })
    },
  }
</script>
