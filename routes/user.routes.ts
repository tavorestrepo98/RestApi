import { Router } from 'express';
import { check } from 'express-validator';

import { getUser, getUsers, postUser, putUser, deleteUser } from '../controllers/user.controller';
import { validarCampos } from '../middlewares/validar-campos';
import { isRoleValid, emailExiste, usuarioExiste } from '../helpers/db.validators';


const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mínimo 6 caracteres').isLength({min: 6}),
    check('role').custom(isRoleValid),
    validarCampos
], postUser);
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
], putUser);
router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
], deleteUser);

export default router;