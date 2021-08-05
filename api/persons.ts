import { AxiosInstance } from 'axios'
import { Moment } from 'moment';

export enum Level {
  EXLPORER,
  HABITANT,
  GUGU,
}

export interface Skill {
  id: number;
  dictId: number;
  name: string;
  since: string;
  level: Level;
}

export interface Expertise {
  id: number;
  dictId: number;
  name: string;
  since: string;
  level: Level;
}

export interface Achievement {
  id: number;
  dictId: number;
  name: string;
  since: string;
  details: string;
}

export interface Position {
  id: number;
  dictId: number;
  teamId: number;
  name: string;
  since: string;
  till?: string;
  description: string;
}

export interface Person {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonDictionaries {
  skills: Skill[];
  expertises: Expertise[];
  achievements: Achievement[];
  positions: Position[];
}

export interface PersonDict {
  dictId: number;
  since: Moment;
  level: number;
  description: string;
}

const PATH = '/persons'
const personPath = (id: number) => `${PATH}/${id}`

export default (axios: AxiosInstance) => ({
  getPersons: (): Promise<Person[]> => axios.get(PATH).then(r => r.data),
  image: (id: number) => `${axios.defaults.baseURL}${personPath(id)}/image.png`,
  updateImage: (id: number, image: File) => {
    var formData = new FormData();
    formData.append("file", image);
    return axios.put(`${personPath(id)}/image.png`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  loadDictionaries: async (id: number) => {
    const [skills, expertises, positions] =
      await Promise.all([
        axios.get(`${personPath(id)}/skills`),
        axios.get(`${personPath(id)}/expertises`),
        // axios.get(`/persons/${id}/achievements`),
        axios.get(`${personPath(id)}/positions`),
      ]);
    return {
      skills: skills.data || [],
      expertises: expertises.data || [],
      achievements: [],
      positions: positions.data || [],
    }
  },

  addPerson: async (name: string, description: string): Promise<Person> => {
    return axios.post(PATH, { name, description }).then(r => r.data)
  },

  addDict: async (id: number, type: string, dict: PersonDict) => {
    return axios.post(`${personPath(id)}/${type}`,
      {
        ...dict,
        since: dict.since.format('YYYY-MM-DD')
      }).then(r => r.data)
  },

  updatePerson: async (id: number, name: string, description: string): Promise<Person> => {
    return axios.put(personPath(id), { name, description }).then(r => r.data)
  },
})
