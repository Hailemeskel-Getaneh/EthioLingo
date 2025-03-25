import userProfileModel from '../models/userProfileModel.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import RefreshToken from '../models/userModel.js'
import bcrypt from 'bcrypt';
import axios from 'axios';
dotenv.config()

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;

const generateToken = (userId,secret,expiresIn) => {
  token = jwt.sign({
        expiresIn: expiresIn,
        userId
      }, secret);
  return token
}
const saveRefreshToken = (userId,refreshToken,ip) => {
    try {
      const response = axios.get(`https://ipapi.co/${ip}/json`);
      const locationData = response.data;
      console.log('User location:', locationData);
    } catch (error) {
      console.error('Error fetching location:', error.message);
    }

    // save the refresh token in db
    const refreshTokenData = RefreshToken.create({
      refreshToken,
      userId,
      revoked:false,
      country:locationData.country_name, 
      region:locationData.region, 
      latitude:locationData.latitude, 
      longitude:locationData.longitude,
      generated_at: new Date()
    })
}

export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    const ip = req.ip
    const userId = await uuidv4()
    const accessToken = generateToken(userId,ACCESS_TOKEN_SECRET,"6h")
    const refreshToken = generateToken(userId,REFRESH_TOKEN_SECRET,"30 days")

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
      
    res.status(200).send({userId,accessToken,refreshToken})

    saveRefreshToken(userId,refreshToken,ip)

  } catch (error) {
    res.status(500).json({ message: '', error });
  }
};

export const login = async (req, res) => {

  try {
    const ip = req.ip
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

            const accessToken = generateToken(userId,ACCESS_TOKEN_SECRET,'6h') 
            const refreshToken = generateToken(userId,REFRESH_TOKEN_SECRET,'60 days') 
            res.status(200).json({ userId, accessToken, refreshToken });

            saveRefreshToken(userId,refreshToken,ip)

        } else {
            // password doesnt match
            res.status(400).json({ message: "Wrong password!" });
        }
    });

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed", error: error.message }); 
  }
};

export const refreshToken = async (req, res) => {
  try {
    const ip = req.ip
    let {refreshToken,accessToken,userId} = req.body

    const result = await RefreshToken.findOneAndUpdate(
      { refreshToken },
      { $set: { revoked: true }},
      { returnOriginal: true } )
    if (!result.value) {
      return res.status(404).json({ message: true });
    }

    if ( result.value.revoked === true ) {
      console.log("refresh token compromised!")
      // maybe revoke all the refresh tokens
      return res.status(404).json({ message: 'refresh token compromised!' });
    }

    // generate new access token and refresh token
    accessToken = generateToken(userId,ACCESS_TOKEN_SECRET,"6h")
    refreshToken = generateToken(userId,REFRESH_TOKEN_SECRET,"30 days")

    res.status(200).send({userId,accessToken,refreshToken})
    // save the refresh token
    saveRefreshToken(userId,refreshToken,ip)

  } catch (error) {
    res.status(500).json({ message: 'couldnt generate new token', error });
  }
};

