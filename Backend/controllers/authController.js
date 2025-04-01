
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import RefreshToken from '../models/jwtModel.js'
import bcrypt from 'bcrypt';
import axios from 'axios';
dotenv.config()

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;

const generateToken = (userId,secret,expiresIn) => {
  const token = jwt.sign({
        expiresIn: expiresIn,
        userId
      }, secret);
  return token
}

const saveRefreshToken = async (userId,refreshToken,ip) => {
    let locationData = null;
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json`);
      locationData = response.data;
      if (locationData.error) locationData = null;
    } catch (error) {
      console.error('Error fetching location:', error.message);
    }
    
    // save the refresh token in db
    const refreshTokenDoc = await RefreshToken.create({
          refreshToken,
          userId,
          revoked: false,
          ip_address: ip,
          country: locationData?.country_name || '',
          region: locationData?.region || '',
          latitude: locationData?.latitude || '',
          longitude: locationData?.longitude || '',
          generated_at: new Date(),
        });
        return refreshTokenDoc
    }

    export const signup = async (req, res) => {
      try {
        let { fullName, email, password } = req.body;
        const ip = req.ip;
        const userId = uuidv4();
    
        const accessToken = generateToken(userId, ACCESS_TOKEN_SECRET, "6h");
        const refreshToken = generateToken(userId, REFRESH_TOKEN_SECRET, "30 days");
    
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error hashing password", error: err });
          }
    
          try {
            const newUser = await User.create({
              userId,
              fullName,
              email,
              password: hash,
            });
    
            res.status(200).send({ userId, accessToken, refreshToken, newUser });
            saveRefreshToken(userId, refreshToken, ip);
          } catch (dbError) {
            if (dbError.code === 11000 && dbError.keyPattern?.email) {
              return res.status(409).json({ message: "Email address already in use." });
            }
            throw dbError;
          }
        });
      } catch (error) {
        res.status(500).json({ message: "Signup failed", error });
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
    if (!result) {
      return res.status(404).json({ message: true });
    }

    if ( result.revoked === true ) {
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

export const forgotPassword = async(req,res) => {
  let {email} = req.body
  const now = new Date();
  try{
    const code = Math.floor(1000 + Math.random() * 9000);
    const user = await User.findOneAndUpdate(
      { email },
      {$set:{
        verificationCode:code,
        verificationCodeCreatedAt:now
      }},
      { new: true, upsert: false }
    ); 

    if (!user) {
        console.log(user)
        return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).send({message:`OTP sent to ${email}.`})
    // send the code via email

  }catch(error){
    return res.status(404).json({ message: `Error sending OTP.${error}` });
  }

}

export const resetPassword = async(req,res) => {
  let {email,otp,newPassword} = req.body

  const user = await User.findOne({email})
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  if (user.verificationCodeCreatedAt < fiveMinutesAgo){
    return res.status(404).json({ message: "OTP expired." });
  }

  if (user.verificationCode === otp){
    // change the password
    const saltRounds = 10;
    bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error hashing password", error: err });
      }

      await User.updateOne({email},{$set:{password:hash}})
    });
    return res.status(200).send({message:`passowrd changed!`})
    }
  
    return res.status(400).send({message:`Invalid OTP.`})
}

export const checkOTP = async(req,res) => {

  let {email,otp,newPassword} = req.body
  const user = await User.findOne({email})
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  if (user.verificationCodeCreatedAt < fiveMinutesAgo){
    return res.status(404).json({ message: "OTP expired." });
  }

  if (user.verificationCode != otp){
    return res.status(404).json({ message: "invalid OTP." });
  }

  return res.status(200).json({ message: "OTP vaild." });
}
