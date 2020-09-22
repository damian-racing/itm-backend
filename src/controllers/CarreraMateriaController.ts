import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CarreraMateriaModel from '../models/CarreraMateriaModel';

export default class CarreraMateriaController {
    constructor() {}
    
    public async create(req: express.Request, res: express.Response) {
        const collection = req.body;
        
        CarreraMateriaModel.bulkCreate(collection, {ignoreDuplicates: true})
        .then(collection => res.status(201).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
