import { Router} from 'express';
import { parseISO,} from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentRepository = new AppointmentRepository();

const appointmentRouter = Router();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});


appointmentRouter.post('/', async (request, response) => {
  try{
    const { provider, date } = request.body;
    const parsedDate = parseISO(date)
    const createAppointmentService = new CreateAppointmentService(appointmentRepository)
    const appointment = await createAppointmentService.execute({provider, date: parsedDate})

    return response.json(appointment);
  }
    catch(err){
    return response.json(err.message)
  }
});

export default appointmentRouter;
