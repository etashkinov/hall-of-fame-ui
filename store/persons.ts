import { Person } from '~/api/persons'
import { api } from '~/plugins/api'

import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  persons: [] as Person[]
})

type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_PERSONS: (state, persons: Person[]) => (state.persons = persons),
  SET_PERSON_IMAGE_CHANGED: (state, personId: number) => {
    const persons = [...state.persons.map(p => p.id == personId ? { ...p, imageChanged: true } : p)]
    state.persons = persons
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async loadPersons({ commit }) {
    const persons = await api.persons.getPersons()
    commit('SET_PERSONS', persons)
  },

  async updateImage({ commit }, { personId, image }: { personId: number, image: File }) {
    await api.persons.updateImage(personId, image)
    commit('SET_PERSON_IMAGE_CHANGED', personId)
  }
}
