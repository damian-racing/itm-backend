import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import MateriaModel from '../models/MateriaModel';
import BaseController from './BaseController';

export default class MateriaController extends BaseController {
    constructor() {
        super(MateriaModel);
    }
    
    static async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const materiaFieldsUpdate = req.body;
        
        if (req.body.nombre) materiaFieldsUpdate.nombre = req.body.nombre;
        if (req.body.duracion) materiaFieldsUpdate.duracion = req.body.duracion;
        if (req.body.turno_id) materiaFieldsUpdate.turno_id = req.body.turno_id;
        
        if (req.body.estado) {
            materiaFieldsUpdate.estado = req.body.estado;
            materiaFieldsUpdate.fecha_estado = new Date();
        }
    
        MateriaModel.update(
            materiaFieldsUpdate,
            { where: { id }, validate: true },
        )
        .then(async (materia) => {        
            if (! materia[0]) res.status(400).send(errorResponse(400, Error('Materia no encontrada')));
            else {
                const materiaEntity = await MateriaModel.findByPk(id);
                if (! materiaEntity) res.status(400).send(errorResponse(400, Error('Materia no encontrada')));
    
                res.status(200).json(successResponse({materiaEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const materiaFieldsUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }
    
        MateriaModel.update(
            materiaFieldsUpdate,
            { where: { id }, validate: true}
        )
        .then((materia) => {
            if (! materia[0]) res.status(400).send(errorResponse(400, Error('Materia no encontrada')));
            else res.status(204).end();
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
