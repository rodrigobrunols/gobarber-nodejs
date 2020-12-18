
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/containers/providers/MailProvider/FakeMailProvider';

import AppError from '@shared/errors/AppError';
import SendPasswordForgotEmailService from './SendPasswordForgotEmailService'

describe('sendPasswordForgotEmailService', () => {
  it('should be able to recover the password using email', async () => {
      const userRepository = new FakeUserRepository();
      const fakeMailProvider = new FakeMailProvider();

      const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail')

      const sendPasswordForgotEmailService = new SendPasswordForgotEmailService(userRepository);

      await userRepository.create({
        name:  'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password'
      });

      const sendPasswordForgotEmail = await sendPasswordForgotEmailService.execute({
        email: 'johndoe@gmail.com',
      });

      expect(sendEmail).toHaveBeenCalled();
  });



})
