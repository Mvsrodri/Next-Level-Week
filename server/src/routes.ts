import express, { response } from 'express';
import PointsController from './controllers/PointsController';
import ItensController from './controllers/ItensController';

const routes = express.Router();
const pointsController =  new PointsController();
const itensController = new ItensController();

/*Função para receber e retornar os usuarios da aplicação*/
/*Function to receive and return users from your aplication*/
routes.get('/itens', itensController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;