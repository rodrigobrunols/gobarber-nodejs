import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import {EntityRepository, getRepository, Repository} from 'typeorm'

class AppointmentsRepository implements IAppointmentsRepository{

  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
     provider_id,
     date
  } : ICreateAppointmentsDTO): Promise<Appointment>{
    const appointment = await this.ormRepository.create({provider_id,date});

    this.ormRepository.save(appointment);

    return appointment;

  }

  public async findByDate(date:Date):Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
        where: {date}
      });

      return findAppointment || undefined;

    }

  }

export default AppointmentsRepository;
