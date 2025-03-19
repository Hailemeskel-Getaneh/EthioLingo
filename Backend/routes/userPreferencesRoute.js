import express from 'express';
import {getLanguages} from '../controllers/languageController.js'

const router=express.Router();

router.get('/', getLanguages); 


export default router;