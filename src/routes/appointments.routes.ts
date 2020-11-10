import {Router} from 'express';
import {parseISO} from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import CreateAppointementsService from '../services/CreateAppointementsService';
import {getCustomRepository} from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/' , async(request, response) =>{

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  response.json( await appointmentsRepository.find())

});

appointmentRouter.post('/' , async (request, response) => {

  const {provider_id , date} = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentsService = new CreateAppointementsService();

  const appointment = await createAppointmentsService.execute({date:parsedDate , provider_id})

  response.json({ appointment})

});

export default appointmentRouter;
