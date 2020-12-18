import UpdateUserAvatarService from './UpdateUserAvatarService';
import CreateUsersService from './CreateUsersService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('UpdateUserAvatar', () => {

  it('should be able to update the user avatar', async () => {
      const userRepository = new FakeUserRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUsersService = new CreateUsersService(userRepository,fakeHashProvider);
      const updateUsersAvatarService = new UpdateUserAvatarService(userRepository);

      const user = await createUsersService.execute({
        name:  'John Doe',
        email: 'john@gmail.com',
        password: 'password',
      });

      const request = {
        user_id : user.id,
        avatarFileName : 'filename'
      }

      const updatedUser = await updateUsersAvatarService.execute(request);

      expect(updatedUser).toHaveProperty('avatar');
  });


  it('not should be to update a non authenticated user avatar', async () => {
    const userRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsersService = new CreateUsersService(userRepository,fakeHashProvider);
    const updateUsersAvatarService = new UpdateUserAvatarService(userRepository);

    const user = await createUsersService.execute({
      name:  'John Doe',
      email: 'john@gmail.com',
      password: 'password',
    });

    const request = {
      user_id : 'other_id',
      avatarFileName : 'other_filename',
    }


    expect(
      updateUsersAvatarService.execute(request)
    ).rejects.toBeInstanceOf(AppError);

    ;
});

})
