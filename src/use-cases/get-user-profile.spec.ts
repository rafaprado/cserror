import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository
let sut: GetProfileUseCase

describe('Get User Profile UseCase',  () => {
  
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetProfileUseCase(usersRepository)
  })

  it('Should to able to get user profile', async() => {

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual("John Doe")
  })

  it('Should not be able to get user profile with a wrong id', async() => { 

   expect(() => sut.execute({
    userId: "Non-exixting-id"
   })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
