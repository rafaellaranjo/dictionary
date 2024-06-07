import User from '../entities/User';
import { AppDataSource } from '@shared/typeorm/data-source';

export const UsersRepository = AppDataSource.getRepository(User).extend({
  async findById(id: string): Promise<User | null> {
    return await this.findOne({ where: { id } });
  },

  async findByName(name: string): Promise<User | null> {
    return await this.findOne({ where: { name } });
  },

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } });
  },

  async findByPassword(password: string): Promise<User | null> {
    return await this.findOne({ where: { password } });
  },

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    return await this.findOne({ where: { email, password } });
  },
});
