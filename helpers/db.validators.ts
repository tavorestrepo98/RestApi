import Role from '../models/role';
import User from '../models/user';

export const isRoleValid = async (role: string = '') => {
    const exist = await Role.findOne({role});
    console.log('Role: ', exist);
    if(!exist){
        throw new Error('No existe el role');
    }
}

export const emailExiste = async(email: string = '') => {
    console.log(email);
    const exist = await User.find({ email });
    console.log('Usuario Existente: ', exist);
    if(exist === []){
        throw new Error('Ya existe el usuario con el siguiente email: ');
    }
}

export const usuarioExiste = async(id: string) => {
    const exist = await User.findById(id);
    if(!exist){
        throw new Error('Este usuario no existe')
    }
}
