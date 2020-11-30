import ICreateAppointmentsDTO from "../dtos/ICreateAppointmentsDTO";
import Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentsRepository {

  findByDate(date: Date): Promise<Appointment | undefined>;

  create(data : ICreateAppointmentsDTO):Promise<Appointment>;

}
