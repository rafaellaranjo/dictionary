import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import CreateUserService from '../services/CreateUserService';

export default class AuthController {
  public async signin(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const { user, token } = await createSession.execute({ email, password });

    return response.json({
      id: user.id,
      name: user.name,
      token,
    });
  }

  public async signup(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    await createUser.execute({ name, email, password });

    const createSession = new CreateSessionsService();
    const { user, token } = await createSession.execute({ email, password });

    return response.json({
      id: user.id,
      name: user.name,
      token,
    });
  }
}
