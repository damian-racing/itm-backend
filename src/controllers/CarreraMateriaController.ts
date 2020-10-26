import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CarreraMateriaModel from '../models/CarreraMateriaModel';
import CursoModel from '../models/CursoModel';
import DocenteModel from '../models/DocenteModel';

export default class CarreraMateriaController {
    constructor() {}

    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const query = {
            include: {
                model: CursoModel,
                include: [
                    DocenteModel
                ]
            }
        }

        CarreraMateriaModel.findByPk(id, query)
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async create(req: express.Request, res: express.Response) {
        const collection = req.body;
        if (Object.entries(collection).length === 0 || collection.length === 0) return res.status(400).send(errorResponse(400, Error("Por favor seleccione la carrera con las materias")));

        let collectionResponse: any = [];
        let errorCollectionResponse;
        collection.forEach(async (row: any) => {
            await CarreraMateriaModel.findOrCreate({where: row})
            .then(row => collectionResponse.push(row))
            .catch((error: Error) => errorCollectionResponse = error.message);
        });
        
        if (errorCollectionResponse) return res.status(500).send(errorResponse(500, errorCollectionResponse));
        
        res.status(201).json(successResponse(collectionResponse));        
    };

    public async delete(req: express.Request, res: express.Response) {
        const collection = req.body;

        let errorCollectionResponse;
        for (let row of collection) {
            await CarreraMateriaModel.destroy({where: row})            
            .catch((error: Error) => errorCollectionResponse = error);
        };
        
        if (errorCollectionResponse) res.status(500).send(errorResponse(500, errorCollectionResponse));
        else res.status(204).end();
    }
}
