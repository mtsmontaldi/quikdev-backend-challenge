import { UserModel } from './user-protocols'

export const userMapper = (userData: any): UserModel => {
  const { _id, name, username, address, addressNumber, birthdate, primaryPhone, description, createdAt } = userData

  const user = {
    id: _id.toString(),
    createdAt,
    name,
    username,
    birthdate,
    address,
    addressNumber,
    primaryPhone,
    description
  }

  console.log(user)

  return user
}
