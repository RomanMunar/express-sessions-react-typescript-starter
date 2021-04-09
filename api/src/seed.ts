import mongoose from 'mongoose'
import { MONGO_URI, MONGO_OPTIONS } from './config'
import faker from 'faker'
import { User } from './models'

const seed = async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
  const users = []
  for (let i = 0; i < 30; i++) {
    const name = faker.name.findName()
    const email = faker.internet.email()
    const avatar = faker.image.avatar()
    const password = faker.internet.password()
    const authMethod = faker.datatype.boolean() ? 'oauth' : 'local'
    const verifiedAt = faker.datatype.boolean() ? Date.now() : null
    users.push({ name, email, avatar, password, authMethod, verifiedAt })
  }
  User.bulkWrite(users)

  await mongoose.disconnect()
}

seed().catch(e => console.error(e))
