import { Router } from 'express';
import welcomeRouter from '@shared/http/routes/welcome.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import authRouter from '@modules/users/routes/auth.routes';
import usersRouter from '@modules/users/routes/users.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../../swagger.json';

const routes = Router();

routes.use('/', welcomeRouter);
routes.use('/user', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;
