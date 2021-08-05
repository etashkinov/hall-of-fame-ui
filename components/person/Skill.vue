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
  import levels from './levels'

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
      const type = levels[this.level]
      const fromWhen = moment(this.since).fromNow()
      return ({
        ...type,
        fromWhen,
      })
    },
  }
</script>
