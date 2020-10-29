import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CorrelativaModel from '../models/CorrelativaModel';

export default class CorrelativaController {
    constructor() {}
    
    public async create(req: express.Request, res: express.Response) {
        const collection = req.body;
        if (Object.entries(collection).length === 0 || collection.length === 0) return res.status(400).send(errorResponse(400, Error("Por favor seleccione la materia con sus correlativas")));

        // const query = {
        //     where: {
        //         carrera_materia_id: collection.map((element: any) => element.carrera_materia_id).shift()
        //     }
        // }
        // CorrelativaModel.destroy(query)
        // .catch((error: Error) => res.status(500).send(errorResponse(500, error)))

        CorrelativaModel.bulkCreate(collection, {ignoreDuplicates: true})
        .then(collection => res.status(201).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
