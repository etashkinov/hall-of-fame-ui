import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { Person } from '~/api/persons'
import { api } from '~/plugins/api'


@Module({
  name: 'persons',
  stateFactory: true,
  namespaced: true,
})
export default class Persons extends VuexModule {
  persons: Person[] = []

  @MutationAction({ mutate: ['persons'] })
  async loadPersons() {
    const persons = await api.persons.getPersons()
    return { persons }
  }
}