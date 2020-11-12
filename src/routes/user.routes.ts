/* eslint-disable consistent-return */
import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.json(user);

    response.send('hello');
  } catch (error) {
    return response.json(error.message);
  }
});

export default userRouter;
