import { AxiosInstance } from 'axios'

export interface Person {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageChanged?: boolean;
}

export default (axios: AxiosInstance) => ({
  getPersons: () => axios.get('/persons').then(r => r.data),
  image: (id: number) => `${axios.defaults.baseURL}/persons/${id}/image.png`,
  updateImage: (id: number, image: File) => {
    var formData = new FormData();
    formData.append("file", image);
    return axios.put(`/persons/${id}/image.png`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
})