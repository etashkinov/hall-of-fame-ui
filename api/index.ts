import { AxiosInstance } from 'axios'
import persons from './persons'

export default (axios: AxiosInstance) => ({
  persons: persons(axios)
})