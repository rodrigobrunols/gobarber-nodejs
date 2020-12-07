import UpdateUserAvatarService from './UpdateUserAvatarService';
import CreateUsersService from './CreateUsersService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update the user avatar', async () => {
      const userRepository = new FakeUserRepository();

      const createUsersService = new CreateUsersService(userRepository);
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

})
