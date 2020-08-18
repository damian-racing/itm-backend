import express from 'express';
import { Model, ModelCtor } from "sequelize/types";
import { successResponse, errorResponse } from '../valueObject/response';

export default class BaseController {
    static model: ModelCtor<Model<any, any>>;

    constructor(model: ModelCtor<Model<any, any>>) {
        BaseController.model = model;
    }

    static async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        BaseController.model.create(object, { validate: true })
        .then(model => res.status(201).json(successResponse(model)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async list(req: express.Request, res: express.Response) {
        BaseController.model.findAll()
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        BaseController.model.findByPk(id)
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('Not found')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const objectFieldUpdate = req.body;
    
        BaseController.model.update(
            objectFieldUpdate,
            { where: { id }, validate: true },
        )
        .then(async(object) => {        
            if (! object[0]) res.status(400).send(errorResponse(400, Error('Not found')));
            else {
                const objectEntity = await BaseController.model.findByPk(id);
                if (! objectEntity) res.status(400).send(errorResponse(400, Error('Not found')));
    
                res.status(200).json(successResponse({objectEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const objectFieldUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }
    
        BaseController.model.update(
            objectFieldUpdate,
            { where: { id }, validate: true}
        )
        .then((object) => {
            if (! object[0]) res.status(400).send(errorResponse(400, Error('Not found')));
            else res.status(204).end();
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
