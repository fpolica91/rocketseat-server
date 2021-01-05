// single resposibility
import {startOfHour} from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentRepository';
interface Request {
  provider: string;
  date: Date;
}
export default class CreateAppointmentService{
  private appointmentRepository: AppointmentRepository;
  constructor(appointmentRepository: AppointmentRepository){
    this.appointmentRepository = appointmentRepository;
  }
  public async execute({provider, date}: Request): Promise<Appointment>{
    const appointmentDate = startOfHour(date)
    const findAppointmentOnSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentOnSameDate) {
        throw new Error('This appointment is already booked!')
    }
    const appointment = await this.appointmentRepository.create({
      date: appointmentDate,
      provider,
    });

    return appointment
    
  }
}