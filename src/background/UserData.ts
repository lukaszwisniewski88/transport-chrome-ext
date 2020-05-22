import User from '../interfaces/User'
import {strapi as server} from './globals'
import {AxiosResponse} from 'axios'

export default class UserData implements User {
  public JWT = ''
  public initialized = false
  public email = ''
  public id = ''
  public timoID = ''

  private _name: string

  get name(): string {
    return this._name
  }
  set name(value) {
    this._name = value
  }
  async login(userData: User) {
    const getToken = (response: AxiosResponse) => {
      this.initialized = true
      this.JWT = response.data.jwt
      this.id = response.data.user.id
      this.email = response.data.user.email
      this.name = response.data.user.name
      this.timoID = response.data.user.company.timoID
      return true
    }

    try {
      const response = await server.post('/auth/local', {
        identifier: userData.email,
        password: userData.id
      })
      return getToken(response)
    } catch (error) {
      if (error.response.status === 400) {
        try {
          const response = await server.post('/auth/local/register', {
            username: userData.name,
            email: userData.email,
            password: userData.id,
            confirmed: true
          })
          return getToken(response)
        } catch (error) {
          console.warn(error)
          return false
        }
      }
    }
  }
}
