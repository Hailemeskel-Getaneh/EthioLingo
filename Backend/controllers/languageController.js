import userPreferencesModel from "../models/userPreferencesModel.js";

export const getLanguages= async(req,res)=>{
    try{
       const languages =await userPreferencesModel.find()
        res.status(200).json(languages);
    }catch (err){
        res.status(500).json({ err: 'Failed to fetch languages' });
    }
}



 