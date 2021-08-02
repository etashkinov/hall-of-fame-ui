import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '~/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
  primary: '#4CAF50',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
}

export default ({ app }) => {
  app.vuetify = new Vuetify({
    lang: {
      t: (key, ...params) => app.i18n.t(key, params),
    },
    theme: {
      themes: {
        dark: theme,
        light: theme,
      },
    },
  })
}
