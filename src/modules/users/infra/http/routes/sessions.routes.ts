import {json, Router} from 'express';
import User from '@modules/users/infra/typeorm/entities/User';
import AuthenticateService from '@modules/users/services/AuthenticateService';
import {container} from 'tsyringe';

const sessionsRouter = Router();

interface Response {
  user: User;
}

sessionsRouter.post('/' , async (request, response) => {
    const {email, password} = request.body;

    const authenticateService = container.resolve(AuthenticateService);

    const {user, token} =   await authenticateService.execute({email, password});

    return response.json({user, token});
});

export default sessionsRouter;
