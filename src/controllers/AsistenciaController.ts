import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import BaseController from './BaseController';
import AsistenciaModel from '../models/AsistenciaModel';

export default class AsistenciaController extends BaseController {
    constructor() {
        super(AsistenciaModel);
    }

    public async createBulk(req: express.Request, res: express.Response) {
        const collection = req.body;
                
        AsistenciaModel.bulkCreate(collection, { validate: true })
        .then(model => res.status(201).json(successResponse(model)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    // public async list(req: express.Request, res: express.Response) {
    //     const query = {
    //         include: [                
    //             AlumnoModel,                
    //             {
    //                 model: CursoModel,
    //                 as: 'curso',
    //                 include: [
    //                     DocenteModel,
    //                     {
    //                         model: CarreraMateriaModel,
    //                         as: 'carreras_materia',
    //                         include: [
    //                             {
    //                                 model: CarreraModel,
    //                                 as: 'carrera'
    //                             },
    //                             {
    //                                 model: MateriaModel,
    //                                 as: 'materia'
    //                             }                        
    //                         ]
    //                     },                     
    //                 ]
    //             },
    //         ],
    //         where: {
    //             fecha_hasta: null
    //         }
    //     }

    //     AsistenciaModel.findAll(query)
    //     .then(collection => res.status(200).json(successResponse(collection)))
    //     .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    // };
    
    // public async read(req: express.Request, res: express.Response) {
    //     const id = req.params.id;
    //     AsistenciaModel.findByPk(id, {
    //         include: [                
    //             AlumnoModel,                
    //             {
    //                 model: CursoModel,
    //                 as: 'curso',
    //                 include: [
    //                     DocenteModel,
    //                     {
    //                         model: CarreraMateriaModel,
    //                         as: 'carreras_materia',
    //                         include: [
    //                             {
    //                                 model: CarreraModel,
    //                                 as: 'carrera'
    //                             },
    //                             {
    //                                 model: MateriaModel,
    //                                 as: 'materia'
    //                             }                        
    //                         ]
    //                     },                     
    //                 ]
    //             },
    //         ],
    //     })
    //     .then(model => {
    //         if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
    //         else res.status(200).json(successResponse({model}));
    //     })
    //     .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    // };
}
