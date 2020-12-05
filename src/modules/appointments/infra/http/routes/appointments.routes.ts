import {Router} from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/' , async(request, response) =>{

//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   response.json( await appointmentsRepository.find())

// });

appointmentRouter.post('/' , appointmentsController.create);

export default appointmentRouter;
