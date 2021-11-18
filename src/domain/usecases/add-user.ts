import { UserModel } from '../models/user'

export interface AddUserModel {
  name: string
  username: string
  birthdate: Date
  address: string
  addressNumber: string
  primaryPhone: string
  description: string
}

export interface AddUser {
  add (user: AddUserModel): Promise<UserModel>
}
