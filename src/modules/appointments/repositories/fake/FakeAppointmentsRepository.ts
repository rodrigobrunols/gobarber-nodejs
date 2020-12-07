import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { uuid } from 'uuidv4';

export default class FakeAppointmentsRepository implements IAppointmentsRepository{

  private repository: Appointment[] = [];

  public async create({
     provider_id,
     date
  } : ICreateAppointmentsDTO): Promise<Appointment>{

    const appointment = new Appointment();
    Object.assign(appointment,{id: uuid(), provider_id, date});
    this.repository.push(appointment);

    return appointment;

  }

    public async findByDate(
      date:Date):Promise<Appointment | undefined> {
        const findAppointment = this.repository.find(
          appointment => appointment.date.getTime === date.getTime,
          );

          return findAppointment;

    }

  }
