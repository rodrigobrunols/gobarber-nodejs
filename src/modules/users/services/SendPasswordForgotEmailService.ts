
import "reflect-metadata"
import User from '../infra/typeorm/entities/User';
import {hash} from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import {inject, injectable} from 'tsyringe';
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {

  email:string;

}

@injectable()
class SendPasswordForgotEmailService{

  constructor(
    @inject('UsersRepository')
    private usersRepository:IUsersRepository
  ){}

  public async execute(data: IRequest):Promise<void>{


  }

}


export default SendPasswordForgotEmailService;
