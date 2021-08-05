import { Person, PersonDictionaries } from '~/api/persons'
import { api } from '~/plugins/api'

import { ActionTree, MutationTree } from 'vuex'

export interface PersonDetails extends Person {
  imageChanged?: boolean;
  dicts?: PersonDictionaries;
}

export const state = () => ({
  persons: {} as Record<number, PersonDetails>
})

type RootState = ReturnType<typeof state>

const updatePerson = (state: RootState, personId: number, doUpdate: (person: PersonDetails) => PersonDetails) => {
  const updatedPerson = doUpdate(state.persons[personId])
  state.persons = { ...state.persons, [personId]: updatedPerson }
}

export const mutations: MutationTree<RootState> = {
  SET_PERSONS: (state, persons: Person[]) => (state.persons = persons.reduce((result, person) => {
    result[person.id] = person
    return result;
  }, {} as Record<number, PersonDetails>)),

  SET_PERSON_IMAGE_CHANGED: (state, personId: number) => {
    updatePerson(state, personId, p => ({ ...p, imageChanged: true }))
  },

  SET_PERSON: (state, person: Person) => {
    state.persons[person.id] = person
  },

  SET_PERSON_DICTS: (state, { personId, dicts }: { personId: number, dicts: PersonDictionaries }) => {
    updatePerson(state, personId, p => ({ ...p, dicts }))
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async addPerson({ commit }, { name }) {
    const person = await api.persons.addPerson(name, "")
    commit('SET_PERSON', person)
  },

  async updatePerson({ commit }, { id, name }) {
    const person = await api.persons.updatePerson(id, name, "")
    commit('SET_PERSON', person)
  },

  async loadPersons({ commit }) {
    const persons = await api.persons.getPersons()
    commit('SET_PERSONS', persons)
  },

  async loadDictionaries({ commit }, personId) {
    const dicts = await api.persons.loadDictionaries(personId)
    commit('SET_PERSON_DICTS', { personId, dicts })
  },

  async addDict({ state, commit }, { personId, type, dict }) {
    const result = await api.persons.addDict(personId, type, dict)
    const dicts = state.persons[personId].dicts || {} as Record<string, any>
    commit('SET_PERSON_DICTS', { personId, dicts: { ...dicts, [type]: [...dicts[type], result] } })
  },

  async updateImage({ commit }, { personId, image }) {
    await api.persons.updateImage(personId, image)
    commit('SET_PERSON_IMAGE_CHANGED', personId)
  }
}
