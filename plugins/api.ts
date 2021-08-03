import { Context } from '@nuxt/types'
import buildApi from '~/api'

let api: ReturnType<typeof buildApi>;

export default (context: Context) => {
  api = buildApi(context.$axios)
}

export { api };

