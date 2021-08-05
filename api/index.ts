import { AxiosInstance } from 'axios'
import dictionaries from './dictionaries'
import persons from './persons'

export default (axios: AxiosInstance) => ({
  persons: persons(axios),
  dictionaries: dictionaries(axios),
})