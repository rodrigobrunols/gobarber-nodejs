
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let userRepository : IUsersRepository;
let userTokenRepository : IUserTokensRepository;
let resetPassword : ResetPasswordService;


describe('sendPasswordForgotEmailService', () => {


   beforeEach(() => {

    userRepository = new FakeUserRepository();
    userTokenRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      userRepository,
      userTokenRepository);

   })


  it('should be able to reset the password', async () => {
    const user = await userRepository.create({
        name:  'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456'
     });

    const { token } = await userTokenRepository.generate(user.id);

    await resetPassword.execute({
        token,
        password : '123123'
      });

      const updatedUser = await userRepository.findById(user.id);

      expect(updatedUser?.password).toBe('123123');
  });

})
