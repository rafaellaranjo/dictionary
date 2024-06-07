import { Router } from 'express';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import EntriesController from '../controllers/EntriesController';

const entriesRouter = Router();
const entryController = new EntriesController();

entriesRouter.use(isAuthenticated);

entriesRouter.post('/entries/en/:id/favorite', (req, res) =>
  entryController.markAsFavorite(req, res),
);

entriesRouter.delete('/entries/en/:id/unfavorite', (req, res) =>
  entryController.unmarkAsFavorite(req, res),
);

entriesRouter.get('/entries/en/:word/', (req, res) =>
  entryController.findWordDictionary(req, res),
);

export default entriesRouter;
