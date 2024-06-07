import UserToken from '@modules/users/typeorm/entities/UserToken';
import { AppDataSource } from '@shared/typeorm/data-source';

export const UserTokensRepository = AppDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    return await this.findOne({ where: { token } });
  },

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({ user_id, token: generateUniqueToken() });
    await this.save(userToken);
    return userToken;
  },
});

function generateUniqueToken(): string {
  return Math.random().toString(36).substr(2);
}

export default UserTokensRepository;
