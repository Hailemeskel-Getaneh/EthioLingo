import userProfileModel from '../models/userProfileModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const SECRET=process.env.SECRET;

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      userId:"ABC"
    }, SECRET);
    console.log("hellow world!")
    res.status(200).json({message:`${fullName} ${password} ${token}`})
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};
export const verify = async (req, res) => {
  try {
    const {token} = req.body
    const body = jwt.verify(token,SECRET)
    res.status(200).json({message:`userId: ${body.data}, username: ${body.username}`})
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};
