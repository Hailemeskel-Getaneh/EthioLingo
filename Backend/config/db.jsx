import mongoose from 'mongoose'

const DatabaseConnection = async () => {
    try{

     mongoose.connect(process.env.MONGO_URL)
    console.log('Database connected successfully')

    }
    catch(error){
        console.log(`Error: ${error }`)
    }
}

export default DatabaseConnection
