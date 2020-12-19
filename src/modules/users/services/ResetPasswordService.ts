
import "reflect-metadata"
import IUsersRepository from '../repositories/IUsersRepository';
import {inject, injectable} from 'tsyringe';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {

  token: string;
  password: string;

}

@injectable()
class ResetPasswordService{

  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('UserTokensRepository')
    private usersTokenRepository:IUserTokensRepository,
  ){}

  public async execute({token , password}: IRequest):Promise<void>{

    const userToken = await this.usersTokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError("User Token does not exists");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user) {
      throw new AppError("User does not exists");
    }

    user.password = password;

    await this.usersRepository.save(user);
  }

}

export default ResetPasswordService;
