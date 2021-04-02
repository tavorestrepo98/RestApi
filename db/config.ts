import mongoose from 'mongoose';

const dbConnection = async() => {

    try {   
        await mongoose.connect('mongodb+srv://tavo:tavo1798@curso-node.htl30.mongodb.net/cafeDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos Online');
    } catch (error) {
        throw new Error(error);
    }

}

export default dbConnection;