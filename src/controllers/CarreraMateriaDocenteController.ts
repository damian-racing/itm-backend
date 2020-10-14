import express from 'express';
import { Op } from 'sequelize';
import { successResponse, errorResponse } from '../valueObject/response';
import CarreraMateriaDocenteModel from '../models/CarreraMateriaDocenteModel';
import BaseController from './BaseController';
import DocenteModel from '../models/DocenteModel';
import CarreraMateriaModel from '../models/CarreraMateriaModel';
import CarreraModel from '../models/CarreraModel';
import MateriaModel from '../models/MateriaModel';

export default class CarreraMateriaDocenteController extends BaseController {
    constructor() {
        super(CarreraMateriaDocenteModel);
    }

    public async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        object.fecha_estado = new Date();
        
        const exist = await CarreraMateriaDocenteModel.findAll({where: {
            carrera_materia_id: object.carrera_materia_id,
            docente_id: object.docente_id,
            fecha_hasta: null
        }});

        if (exist.length > 0) res.status(400).send(errorResponse(400, Error("Carrera materia docente existente")));
        else {
            CarreraMateriaDocenteModel.create(object, { validate: true })
            .then(model => res.status(201).json(successResponse(model)))
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
    
    public async list(req: express.Request, res: express.Response) {
        const query = {
            include: [                
                DocenteModel,                
                {
                    model: CarreraMateriaModel,
                    as: 'carreras_materia',
                    include: [
                        {
                            model: CarreraModel,
                            as: 'carrera'
                        },
                        {
                            model: MateriaModel,
                            as: 'materia'
                        }                        
                    ]
                },
            ],
            where: {
                fecha_hasta: null
            }
        }

        CarreraMateriaDocenteModel.findAll(query)
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        CarreraMateriaDocenteModel.findByPk(id, {
            include: [                
                DocenteModel,                
                {
                    model: CarreraMateriaModel,
                    as: 'carreras_materia',
                    include: [
                        {
                            model: CarreraModel,
                            as: 'carrera'
                        },
                        {
                            model: MateriaModel,
                            as: 'materia'
                        }                        
                    ]
                },
            ],
        })
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const objectFieldUpdate = req.body;

        CarreraMateriaDocenteModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true },
        )
        .then(async(object) => {        
            if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else {
                const objectEntity = await CarreraMateriaDocenteModel.findByPk(id);
                if (! objectEntity) res.status(400).send(errorResponse(400, Error('No encontrado')));
    
                res.status(200).json(successResponse({objectEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const objectFieldUpdate = {
            fecha_hasta: new Date()
        }
    
        CarreraMateriaDocenteModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true}
        )
        .then((object) => {
            if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(204).end();
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
