import "reflect-metadata"
import {startOfHour} from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import {inject, injectable} from 'tsyringe';

interface IRequest {
  date:Date;
  provider_id:string;
}

@injectable()
class CreateAppointementsService{

  constructor(
    @inject('AppointmentsRepository') private appointmentsRepository: IAppointmentRepository
  ){}

  public async execute({date, provider_id }:IRequest):Promise<Appointment>{

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate){

      throw new AppError("This appointment is already booked" );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,//error checking
      date: appointmentDate,
    });

    return appointment;
  }

}

export default CreateAppointementsService;
