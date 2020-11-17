export interface IUser {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface IFbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface IPost {
  id?: string
  title: string
  text: string
  autor: string
  date: Date
}