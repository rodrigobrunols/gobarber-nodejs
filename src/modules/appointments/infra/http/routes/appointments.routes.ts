import {Router} from 'express';
import {parseISO} from 'date-fns';
import CreateAppointementsService from '@modules/appointments/services/CreateAppointementsService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import {container} from 'tsyringe';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/' , async(request, response) =>{

//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   response.json( await appointmentsRepository.find())

// });

appointmentRouter.post('/' , async (request, response) => {

  const {provider_id , date} = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentsService = container.resolve(CreateAppointementsService);

  const appointment = await createAppointmentsService.execute({date:parsedDate , provider_id})

  response.json({ appointment})

});

export default appointmentRouter;
