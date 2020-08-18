import express from 'express';
import md5 from 'md5';
import { successResponse, errorResponse } from '../valueObject/response';
import { UsuarioModel } from '../models';
import BaseController from './BaseController';

export default class UsuarioController extends BaseController {
    constructor() {
        super(UsuarioModel);
    }

    static async create(req: express.Request, res: express.Response) {
        const userObject = req.body;
    
        if (userObject.password) userObject.password = md5(req.body.password);
    
        userObject.fecha_estado = new Date();
        userObject.estado = 'activo';
        
        UsuarioModel.create(userObject, { validate: true })
        .then(user => res.status(201).json(successResponse(user)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const userFieldUpdate = req.body;
    
        if (req.body.password) userFieldUpdate.password = md5(req.body.password);
    
        if (req.body.estado) {
            userFieldUpdate.estado = req.body.estado;
            userFieldUpdate.fecha_estado = new Date();
        }
    
        UsuarioModel.update(
            userFieldUpdate,
            { where: { id }, validate: true },
        )
        .then(async (user) => {        
            if (! user[0]) res.status(400).send(errorResponse(400, Error('Usuario no encontrado')));
            else {
                const userEntity = await UsuarioModel.findByPk(id);
                if (! userEntity) res.status(400).send(errorResponse(400, Error('Usuario no encontrado')));
    
                res.status(200).json(successResponse({userEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    static async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const userFieldUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }
    
        UsuarioModel.update(
            userFieldUpdate,
            { where: { id }, validate: true}
        )
        .then((user) => {
            if (! user[0]) res.status(400).send(errorResponse(400, Error('Usuario no encontrado')));
            else res.status(204).end();
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
