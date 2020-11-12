import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    try {
      const userRepository = getRepository(User);
      const userAlreadyExists = await userRepository.findOne({
        where: { email },
      });
      if (userAlreadyExists) {
        throw new Error('Email is already in use');
      }
      const user = userRepository.create({ name, email, password });
      await userRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
