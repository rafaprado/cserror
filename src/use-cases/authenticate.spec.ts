import { beforeEach, describe, expect, it } from 'vitest'
import {  hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate UseCase',  () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should to able to authenticate', async() => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'Johndoe@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async() => { 

   expect(() => sut.execute({
    email: 'johndoe@example.com',
    password: '123456'
   })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async() => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      password_hash: await hash('123456', 6)
    })

   expect(() => sut.execute({
    email: 'johndoe@example.com',
    password: '123465'
   })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})