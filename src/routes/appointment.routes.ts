import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json(error.message);
  }
});

export default appointmentRouter;
