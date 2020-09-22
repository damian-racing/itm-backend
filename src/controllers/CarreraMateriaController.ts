import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CarreraMateriaModel from '../models/CarreraMateriaModel';

export default class CarreraMateriaController {
    constructor() {}
    
    public async create(req: express.Request, res: express.Response) {
        const collection = req.body;
        if (Object.entries(collection).length === 0 || collection.length === 0) return res.status(400).send(errorResponse(400, Error("Por favor seleccione la carrera con las materias")));

        const query = {
            where: {
                carrera_id: collection.map((element: any) => element.carrera_id).shift()
            }
        }
        CarreraMateriaModel.destroy(query)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))

        CarreraMateriaModel.bulkCreate(collection, {ignoreDuplicates: true})
        .then(collection => res.status(201).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
