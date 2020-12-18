import AuthenticateService from './AuthenticateService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUsersService from './CreateUsersService';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {

  it('should be able to authenticate a new user', async () => {
    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(userRepository,hashProvider);

    await createUsersService.execute({
      name:  'John Doe',
      email: 'john@gmail.com',
      password: 'password'
    });

    const authenticateUser = new AuthenticateService(userRepository , hashProvider);

    const user = await authenticateUser.execute({
      email: 'john@gmail.com',
      password: 'password'});

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate a user that does not exists', async () => {

    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateService(userRepository,hashProvider);

     expect(authenticateUser.execute({
       email: 'naoexiste@gmail.com',
       password: 'password'})).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to authenticate a user with incorrect password', async () => {

    const fakeUserRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();

    const createUsersService = new CreateUsersService(fakeUserRepository,hashProvider);
    const authenticateUser = new AuthenticateService(fakeUserRepository, hashProvider);

    await createUsersService.execute({
      name:  'John Doe',
      email: 'john@gmail.com',
      password: 'password'
    });


    expect(authenticateUser.execute({
      email: 'john@gmail.com',
      password: 'incorrect'
    })).rejects.toBeInstanceOf(AppError);


  });

})
