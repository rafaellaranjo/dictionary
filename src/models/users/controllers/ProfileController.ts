import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    let user_id;
    if (request !== undefined && request.user !== undefined) {
      user_id = request.user.id;
    } else {
      return response.status(400).json({ message: 'Failed to find user id.' });
    }

    try {
      const user = await showProfile.execute({ user_id });
      return response.json(instanceToInstance(user));
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to find profile.', error });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    let user_id;
    if (request !== undefined && request.user !== undefined) {
      user_id = request.user.id;
    } else {
      return response.status(400).json({ message: 'Failed to find user id.' });
    }

    const { name, email, password, old_password } = request.body;

    try {
      const updateProfile = new UpdateProfileService();

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      });

      return response.json(instanceToInstance(user));
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Failed to update profile.', error });
    }
  }
}
