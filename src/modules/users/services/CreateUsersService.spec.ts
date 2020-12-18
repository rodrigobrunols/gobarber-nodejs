import CreateUsersService from './CreateUsersService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
      const userRepository = new FakeUserRepository();
      const hashProvider = new FakeHashProvider();
      const createUsersService = new CreateUsersService(userRepository,hashProvider);

      const user = await createUsersService.execute({
        name:  'John Doe',
        email: 'john@gmail.com',
        password: 'password'
      });

      expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users on the same email', async () => {

    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(userRepository,hashProvider);

    const user = await createUsersService.execute({
      name:  'John Doe',
      email: 'john@gmail.com',
      password: 'password'
    });


    expect(createUsersService.execute({
      name:  'John Doe',
      email: 'john@gmail.com',
      password: 'password'
    })).rejects.toBeInstanceOf(AppError);


  });

})
