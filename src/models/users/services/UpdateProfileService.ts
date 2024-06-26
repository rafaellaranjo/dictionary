import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await UsersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError('Email already in use');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const passwordConfirmed = await compare(old_password, user.password);
      if (!passwordConfirmed) {
        throw new AppError('Old password incorrect');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
