import { Request, Response } from 'express';
import knex from '../database/connection';

class ItensController{
    async index(request:Request, response: Response) { 
        const itens = await knex('itens').select('*');
    
        const serializedItens = itens.map(item =>{
            return {
                id: item.id,
                title: item.title,
                image: `http://192.168.15.21:3333/temp/${item.image}`,  
            };
        });
    
        return response.json(serializedItens);
              
    }
}

export default ItensController;