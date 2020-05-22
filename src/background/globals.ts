import Axios from 'axios'
import UserData from './UserData'

export const strapi = Axios.create({
  baseURL: 'http://wisienkauksz.nazwa.pl:1337/'
})

export const user = new UserData()
