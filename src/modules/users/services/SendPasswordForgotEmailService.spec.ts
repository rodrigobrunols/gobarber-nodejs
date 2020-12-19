
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import SendPasswordForgotEmailService from './SendPasswordForgotEmailService'

let userRepository : IUsersRepository;
let fakeMailProvider: IMailProvider;
let userTokenRepository : IUserTokensRepository;
let sendPasswordForgotEmailService: SendPasswordForgotEmailService;


describe('sendPasswordForgotEmailService', () => {


   beforeEach(() => {

    userRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    userTokenRepository = new FakeUserTokensRepository();

    sendPasswordForgotEmailService = new SendPasswordForgotEmailService(
      userRepository,
      fakeMailProvider,
      userTokenRepository);

   })


  it('should be able to recover the password using email', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await userRepository.create({
        name:  'John Doe',
        email: 'johndoe@gmail.com',
        password: 'password'
      });

      const sendPasswordForgotEmail = await sendPasswordForgotEmailService.execute({
        email: 'johndoe@gmail.com',
      });

      expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password from a non-existent user', async () => {

    await expect(
      sendPasswordForgotEmailService.execute({
        email: 'johndoe@gmail.com',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a a forgot passwoard user token', async () => {

  const generate = jest.spyOn(userTokenRepository, 'generate');

   const user = await userRepository.create({
      name:  'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password'
    });

    const sendPasswordForgotEmail = await sendPasswordForgotEmailService.execute({
      email: 'johndoe@gmail.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);

  });


})
