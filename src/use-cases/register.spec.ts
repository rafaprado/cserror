
import { RegisterUseCase } from './register';
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/users-already-exists-error';


let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register UseCase',  () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should to able register', async() => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      password: '123456'
    })
   

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async() => {
    
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      password: '123456'
    })
    const isPasswordCorrectlyHash = await compare(
      '123456',
      user.password_hash,
    )


    expect(isPasswordCorrectlyHash).toBe(true)
  })

  it('Should not be able to register with same email twice', async() => {
    
    const email =  'johndoefrank@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    })

  await expect(() =>  
    sut.execute({
    name: 'John Doe',
    email,
    password: '123456'
   })
  ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    
  })
})

