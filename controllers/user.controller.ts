import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const { limit } = req.body || 5;

    const resp = await Promise.all([
        User.countDocuments({ estado: true }),
        User.find({ estado: true })
        .limit(limit)
    ]);

    res.json({
        resp
    })
}

export const getUser = (req: Request, res: Response) => {
    res.json({
        message: 'get user'
    });
}

export const postUser = async (req: Request, res: Response) => {

    const body = req.body;

    let { name, email, password, role } = body;

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    
    let usuario = new User({
        name,
        email,
        password, 
        role
    });

    try {
        await usuario.save();
    
        res.json({
            message: 'post user',
            usuario
        });
    } catch (error) {
        res.json({
            ok: false,
            message: 'No se creó el usuario',
            error: error
        })
        throw Error('No se creó el usuario');
    };

}

export const putUser = async (req: Request, res: Response) => {
    console.log('query: ', req.query);
    console.log('body: ', req.body);
    const { id } = req.params;
    let pass: string = req.body.password.toString() || null;
    let { _id, password, google, correo, ...resto } = req.body;

    if(pass){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(pass, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, resto);
    res.json({
        message: 'Usuario editado',
        usuario
    });


}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    //Borrar físicamente
    const usuario = await User.findByIdAndDelete(id);

    res.json({
        message: 'delete user',
        usuario
    });
}