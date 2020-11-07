import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentRepository = new AppointmentRepository();
const appointmentRouter = Router();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentOnSameDate = appointmentRepository.findByDate(
    parsedDate,
  );
  if (findAppointmentOnSameDate) {
    return response.json({ error: 'This appointment is already booked' });
  }
  const appointment = appointmentRepository.create({
    date: parsedDate,
    provider,
  });
  return response.json(appointment);
});

export default appointmentRouter;
