import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

/*Variavel App recebe todas funcionalidades do express*/
/*App Variable receive all functionalities from express*/
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/temp', express.static(path.resolve(__dirname, '..', 'temp')));
/*Comando para iniciar o sistema na porta 3333*/
/*Command to start the system on port 3333 */
app.listen(3333);