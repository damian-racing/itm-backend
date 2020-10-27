import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import BaseController from './BaseController';
import EvaluacionModel from '../models/EvaluacionModel';

export default class EvaluacionController extends BaseController {
    constructor() {
        super(EvaluacionModel);
    }

    public async createBulk(req: express.Request, res: express.Response) {
        const collection = req.body;
                
        EvaluacionModel.bulkCreate(collection, { validate: true })
        .then(model => res.status(201).json(successResponse(model)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
