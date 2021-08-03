import { AxiosInstance } from 'axios'

export interface Person {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default (axios: AxiosInstance) => ({
  getPersons: (): Promise<Person[]> => axios.get('/persons').then(r => r.data)
})