import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointmentHour = startOfHour(date);
    const findAppointmentOnSameDate = await appointmentRepository.findByDate(
      appointmentHour,
    );
    if (findAppointmentOnSameDate) {
      throw new Error('This appointment is already booked');
    }
    const appointment = appointmentRepository.create({
      date: appointmentHour,
      provider,
    });
    await appointmentRepository.save(appointment);
    return appointment;
  }
}
