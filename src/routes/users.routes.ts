import {json, Router} from 'express';
import User from '../models/User';
import CreateUsersService from '../services/CreateUsersService';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/' , async (request, response) => {
const {name, email, password} = request.body;
const createUsersService = new CreateUsersService();

try{

  const user =  await createUsersService.execute({name, email, password});
  return response.status(201).json(user);

}catch (err) {
  return response.status(400).json({error:err.message});
}

});

usersRouter.patch('/avatar' ,
ensureAuthenticated,
upload.single('avatar'),
async (request, response) =>{
  console.log(request.file);
  return response.json({ok:true})
})

export default usersRouter;
