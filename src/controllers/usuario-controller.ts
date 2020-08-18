import express from 'express';
import md5 from 'md5';
import { successResponse, errorResponse } from '../valueObject/response';
import { UsuarioModel } from '../models';

function create(req: express.Request, res: express.Response) {
    const userObject = req.body;

    if (userObject.password) userObject.password = md5(req.body.password);

    userObject.fecha_estado = new Date();
    userObject.estado = 'activo';
    
    UsuarioModel.create(userObject, { validate: true })
    .then(user => res.status(201).json(successResponse(user)))
    .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
};

function findAll(req: express.Request, res: express.Response) {
    UsuarioModel.findAll()
    .then(users => res.status(200).json(successResponse(users)))
    .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
};

function findById(req: express.Request, res: express.Response) {
    const id = req.params.id;
    UsuarioModel.findByPk(id)
    .then(user => {
        if (! user) res.status(400).send(errorResponse(400, Error('User not found')));
        else res.status(200).json(successResponse({user}));
    })
    .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
};

async function update(req: express.Request, res: express.Response) {
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
        if (! user[0]) res.status(400).send(errorResponse(400, Error('User not found')));
        else {
            const userEntity = await UsuarioModel.findByPk(id);
            if (! userEntity) res.status(400).send(errorResponse(400, Error('User not found')));

            res.status(200).json(successResponse({userEntity}));
        }
    })
    .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
};

function remove(req: express.Request, res: express.Response) {
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
        if (! user[0]) res.status(400).send(errorResponse(400, Error('User not found')));
        else res.status(204).end();
    })
    .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
};

export { create, findAll, findById, update, remove };
