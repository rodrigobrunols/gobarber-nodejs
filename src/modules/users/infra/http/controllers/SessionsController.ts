import {container} from 'tsyringe';
import {Request,Response } from 'express';
import AuthenticateService from '@modules/users/services/AuthenticateService';


export default class SessionsController {


  public async create(request: Request, response:Response) : Promise<Response> {
    const {email, password} = request.body;

    const authenticateService = container.resolve(AuthenticateService);

    const {user, token} =   await authenticateService.execute({email, password});

    return response.json({user, token});

  }

}
