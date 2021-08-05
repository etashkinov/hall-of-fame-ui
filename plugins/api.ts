import { Context } from '@nuxt/types'
import Vue from 'vue'
import buildApi from '~/api'

let api: ReturnType<typeof buildApi>;
declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof api
  }
}

export default (context: Context) => {
  api = buildApi(context.$axios)
  Vue.prototype.$api = api
}

export { api };

