import {json, Router} from 'express';
import User from '../models/User';
import CreateUsersService from '../services/CreateUsersService';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/' , async (request, response) => {
const {name, email, password} = request.body;

const createUsersService = new CreateUsersService();

  const user =  await createUsersService.execute({name, email, password});
  return response.status(201).json(user);

});

usersRouter.patch('/avatar' ,
ensureAuthenticated,
upload.single('avatar'),
async (request, response) =>{
     const updateUserAvatarService = new UpdateUserAvatarService();

     const user = await updateUserAvatarService.execute({

        user_id: request.user.id,
        avatarFileName : request.file.filename
      })
      return response.json(user);
})


export default usersRouter;
