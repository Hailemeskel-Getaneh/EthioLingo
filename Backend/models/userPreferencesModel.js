import mongoose from 'mongoose';
const userSchema= new mongoose.Schema({
      name: {
            type: String,
            required: true,
          },
        },
        {
          timestamps: true, 
        }  
);


const userPreferencesModel = mongoose.model('userPreferencesModel',userSchema)
export default  userPreferencesModel;
