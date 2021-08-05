import { AxiosInstance } from 'axios'

export enum DictType {
  SKILLS = 'skills',
  EXPERTISES = 'expertises',
  ACHIEVEMENTS = 'achievements',
  POSITIONS = 'positions',
  TEAMS = 'teams',
}
export interface Dict {
  dictId: number;
  name: string;
  description: string;
}

const path = (type: DictType) => `/dictionaries/${type}`
const itemPath = (type: DictType, id: number) => `${path(type)}/${id}`

export default (axios: AxiosInstance) => ({
  get: async (type: DictType): Promise<Dict[]> => {
    return axios.get(path(type)).then(r => r.data)
  },
  add: async (type: DictType, name: string, description: string): Promise<Dict> => {
    return axios.post(path(type), { name, description }).then(r => r.data)
  },
  update: async (type: DictType, id: number, name: string, description: string): Promise<Dict> => {
    return axios.put(itemPath(type, id), { name, description }).then(r => r.data)
  },
  delete: async (type: DictType, id: number): Promise<Dict> => {
    return axios.delete(itemPath(type, id)).then(r => r.data)
  }
})