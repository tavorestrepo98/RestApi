import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    role: {
        type: String,
        require: [true, 'El role es obligatorio']
    }
});

const modelo = model('Role', roleSchema);

export default modelo;