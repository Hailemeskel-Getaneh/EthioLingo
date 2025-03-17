import userPreferencesModel from "../models/userPreferencesModel.js";
export const getLanguages= async(req,res)=>{
    try{
       const languages =await userPreferencesModel.find()
        res.status(200).json(languages);
    }catch (err){
        res.status(500).json({ err: 'Failed to fetch languages' });
    }
}

export const selectLanguage=async(req,res)=>{
    try{
        const {name,flag}= req.body
        const  newlanguage =new userPreferencesModel({name,flag});
        await newlanguage,save()
        res.status(201).json(newlanguage)
    }catch(err){
        res.status(500).json({err:'faild to select language'})
    }
} 