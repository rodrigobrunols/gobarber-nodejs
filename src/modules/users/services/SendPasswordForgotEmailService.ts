
import "reflect-metadata"
import IUsersRepository from '../repositories/IUsersRepository';
import {inject, injectable} from 'tsyringe';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {

  email:string;

}

@injectable()
class SendPasswordForgotEmailService{

  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository,

    @inject('MailProvider')
    private mailProvider:IMailProvider,

    @inject('UserTokensRepository')
    private usersTokenRepository:IUserTokensRepository,
  ){}

  public async execute({email}: IRequest):Promise<void>{

    const user = await this.usersRepository.findByEmail(email);

    if(!user){

      throw new AppError("User doen't exists");

    }

    const userToken = this.usersTokenRepository.generate(user.id);


    this.mailProvider.sendMail(email, "Recuperação Email" , "Recuperação Email");

  }

}


export default SendPasswordForgotEmailService;
