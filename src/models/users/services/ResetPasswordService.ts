import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokenRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UserTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token de usuário não encontrado.');
    }

    const user = await UsersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    if (isAfter(Date.now(), addHours(userToken.created_at, 2))) {
      throw new AppError('Token de usuário expirado.');
    }

    user.password = await hash(password, 8);
    await UsersRepository.save(user);
  }
}

export default ResetPasswordService;
