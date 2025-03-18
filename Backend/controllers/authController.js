import userProfileModel from '../models/userProfileModel.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
dotenv.config()

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;

export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    const userId = await uuidv4()
    const accessToken = await jwt.sign({
      expiresIn: "60 days",
      userId
    }, ACCESS_TOKEN_SECRET,);

    // hash the password
    const saltRounds = 10;
    await bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        console.error(err);
        return
      }

      // save the user in the database
      const user = User.create({
        userId,
        fullName,
        email,
        password:hash
      })

    });
      
    res.status(200).json({userId,accessToken})
  } catch (error) {
    res.status(500).json({ message: '', error });
  }
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }); 

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const hashedPassword = user.password;

        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: "Error comparing passwords", error: err });
            }

            if (result) {
                const userId = user.userId;
                const accessToken = jwt.sign({
                  expiresIn: "60 days",
                  userId
                }, ACCESS_TOKEN_SECRET,);

                res.status(200).json({ userId, accessToken });

            } else {
                // password doesnt match
                res.status(400).json({ message: "Wrong password!" });
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error: error.message }); // Include error message for debugging
    }
};

export const verify = async (req, res) => {
  try {
    const {userId,status} = req.body
    res.status(200).json({userId})
  } catch (error) {
    res.status(500).json({ message: 'invalid token', error });
  }
};

