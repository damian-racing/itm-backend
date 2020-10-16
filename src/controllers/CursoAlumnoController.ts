import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CursoAlumnoModel from '../models/CursoAlumnoModel';
import BaseController from './BaseController';
import CarreraMateriaModel from '../models/CarreraMateriaModel';
import CarreraModel from '../models/CarreraModel';
import MateriaModel from '../models/MateriaModel';
import CursoModel from '../models/CursoModel';
import AlumnoModel from '../models/AlumnoModel';
import DocenteModel from '../models/DocenteModel';

export default class CursoAlumnoController extends BaseController {
    constructor() {
        super(CursoAlumnoModel);
    }

    public async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        object.fecha_estado = new Date();
        
        const exist = await CursoAlumnoModel.findAll({where: {
            alumno_id: object.alumno_id,
            curso_id: object.curso_id,
            fecha_hasta: null
        }});

        if (exist.length > 0) res.status(400).send(errorResponse(400, Error("Curso existente")));
        else {
            CursoAlumnoModel.create(object, { validate: true })
            .then(model => res.status(201).json(successResponse(model)))
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
    
    public async list(req: express.Request, res: express.Response) {
        const query = {
            include: [                
                AlumnoModel,                
                {
                    model: CursoModel,
                    as: 'curso',
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
            ],
            where: {
                fecha_hasta: null
            }
        }

        CursoAlumnoModel.findAll(query)
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        CursoAlumnoModel.findByPk(id, {
            include: [                
                AlumnoModel,                
                {
                    model: CursoModel,
                    as: 'curso',
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

        CursoAlumnoModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true },
        )
        .then(async(object) => {        
            if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else {
                const objectEntity = await CursoAlumnoModel.findByPk(id);
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
    
        CursoAlumnoModel.update(
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
