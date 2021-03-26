import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
    res.json({
        message: 'get users'
    });
}

export const getUser = (req: Request, res: Response) => {
    res.json({
        message: 'get user'
    });
}

export const postUser = (req: Request, res: Response) => {

    const body = req.body;

    res.json({
        message: 'post user',
        body
    });
}

export const putUser = (req: Request, res: Response) => {
    res.json({
        message: 'put user'
    });
}

export const deleteUser = (req: Request, res: Response) => {
    res.json({
        message: 'delete user'
    });
}