import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CarreraModel from '../models/CarreraModel';
import MateriaModel from '../models/MateriaModel';
import CarreraMateriaModel from '../models/CarreraMateriaModel';
import BaseController from './BaseController';
import CursoModel from '../models/CursoModel';
import DocenteModel from '../models/DocenteModel';
import CorrelativaModel from '../models/CorrelativaModel';

export default class CarreraMateriaController extends BaseController  {
    constructor() {
        super(CarreraMateriaModel)
    }

    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        CarreraMateriaModel.findByPk(id, {
            include: [                
                {
                    model: CursoModel,
                    as: 'cursos',
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
                    ]
                },
                {
                    model: CorrelativaModel,
                    as: 'correlativas',
                    include: [
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
    
    public async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        object.fecha_estado = new Date();
        object.estado = 'activo';

        const query = {
            where: {
                carrera_id: object.carrera_id,
                materia_id: object.materia_id,
                estado: "activo"
            }
        }
        const existCarreraMateria = await CarreraMateriaModel.findOne(query)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))

        if (existCarreraMateria) res.status(400).send(errorResponse(400, Error("Carrera materia vigente")));
        else {
            CarreraMateriaModel.create(object, { validate: true })
            .then(model => res.status(201).json(successResponse(model)))
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };

    public async list(req: express.Request, res: express.Response) {
        const query = {
            include: [
                {
                    model: CarreraModel,
                    as: 'carrera'
                },
                {
                    model: MateriaModel,
                    as: 'materia'
                }                        
            ],
            where: {
                estado: 'activo'
            }
        }

        CarreraMateriaModel.findAll(query)
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };

    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
        
        const query = {
            where: {
                carrera_materia_id: id,
                fecha_hasta: null
            }
        }
        const existCurso = await CursoModel.findOne(query)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))

        if (existCurso) res.status(400).send(errorResponse(400, Error("Curso vigente")))
        else {
            const objectFieldUpdate = {
                estado: 'baja',
                fecha_estado: new Date()
            }
        
            CursoModel.update(
                objectFieldUpdate,
                { where: { id }, validate: true}
            )
            .then((object) => {
                if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
                else res.status(204).end();
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
}
