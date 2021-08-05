import Vue from 'vue'
import { api } from '~/plugins/api'

import { ActionTree, MutationTree } from 'vuex'
import { Dict, DictType } from '~/api/dictionaries'



export const state = () => ({
  values: {} as Record<number, Dict>
})

type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  SET_TEAMS: (state, values: Dict[]) => {
    const teams = values.reduce((result, d) => {
      result[d.dictId] = d
      return result;
    }, {} as Record<number, Dict>)
    state.values = teams;
  },

  SET_TEAM: (state, value: Dict) => {
    state.values = { ...state.values, [value.dictId]: value };
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async add({ commit }, name) {
    const value = await api.dictionaries.add(DictType.TEAMS, name, "")
    commit('SET_TEAM', value)
  },

  async update({ commit }, { id, name }) {
    const value = await api.dictionaries.update(DictType.TEAMS, id, name, "")
    commit('SET_TEAMS', value)
  },

  async load({ commit }) {
    const values = await api.dictionaries.get(DictType.TEAMS) || []
    commit('SET_TEAMS', values)
  },
}
