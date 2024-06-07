import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha incorreto!');
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Email ou senha incorreto!');
    }

    const token = sign(
      {
        id: user.id,
      },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { user, token };
  }
}

export default CreateSessionsService;
