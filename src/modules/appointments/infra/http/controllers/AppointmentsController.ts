import CreateAppointementsService from "@modules/appointments/services/CreateAppointmentsService";
import {container} from 'tsyringe';
import {parseISO} from 'date-fns';
import {Request,Response } from 'express';


export default class AppointmentsController {


 public async create(request:Request, response:Response):Promise<Response> {

    const {provider_id , date} = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentsService = container.resolve(CreateAppointementsService);

    const appointment = await createAppointmentsService.execute({date:parsedDate , provider_id})

   return  response.json({ appointment})
 }

}
