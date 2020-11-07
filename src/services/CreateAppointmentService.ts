import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentHour = startOfHour(date);
    const findAppointmentOnSameDate = this.appointmentRepository.findByDate(
      appointmentHour,
    );
    if (findAppointmentOnSameDate) {
      throw new Error('This appointment is already booked');
    }
    const appointment = this.appointmentRepository.create({
      date: appointmentHour,
      provider,
    });
    return appointment;
  }
}
