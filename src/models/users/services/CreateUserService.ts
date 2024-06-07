import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email já está sendo utilizado em outra conta.');
    }

    const hashedPassword = await hash(password, 8);

    const user = UsersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await UsersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
