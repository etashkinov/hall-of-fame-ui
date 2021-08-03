import { Module, VuexModule, MutationAction, Mutation } from 'vuex-module-decorators'


@Module({
  name: 'theme',
  stateFactory: true,
  namespaced: true,
})
export default class Theme extends VuexModule {
  barColor = 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)'
  barImage = 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg'
  showBarImage = true
  drawer = false

  @Mutation
  changeBarImage(barImage: string) {
    this.barImage = barImage
  }

  @Mutation
  toggleBarImage(showBarImage: boolean) {
    this.showBarImage = showBarImage
  }

  @Mutation
  changeDrawer(drawer: boolean) {
    this.drawer = drawer
  }

  get getBarImage() {
    return this.showBarImage ? this.barImage : 'noimage'
  }
}