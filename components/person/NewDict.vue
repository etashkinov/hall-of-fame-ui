<template>
  <v-chip
    class="ma-1"
    outlined
    @click="opened = true"
  >
    <form-dialog
      v-model="opened"
      :title="title"
      :on-save="onSave"
    >
      <slot />
    </form-dialog>
    <v-icon left>
      mdi-plus
    </v-icon>
    New
  </v-chip>
</template>

<script>
  import Vue from 'vue'
  import FormDialog from '~/components/base/FormDialog'

  export default Vue.extend({
    name: 'NewDict',
    components: {
      FormDialog,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
      onSave: {
        type: Function,
        required: true,
      },
    },
    data () {
      return {
        opened: false,
      }
    },
  })
</script>
