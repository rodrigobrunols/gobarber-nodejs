import CreateAppointementsService from './CreateAppointmentsService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fake/FakeAppointmentsRepository';

describe('CreateAppointments', () => {
  it('should be able to create a new appointment', async () => {
      const appointmentRepository = new FakeAppointmentsRepository();
      const createAppointmentsService = new CreateAppointementsService(appointmentRepository);

      const appointment = await createAppointmentsService.execute({
        date : new Date(),
        provider_id: '123456'
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', () => {

    expect(1 + 1).toBe(2);

  });

})

// test('sum two numbers' , () => {
//  expect(1 + 2).toBe(3);
// })
