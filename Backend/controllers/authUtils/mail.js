import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const validEmail = (email) => email.toLowerCase().match(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const getTransport = ()=> nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWD
  }
});

const getMailOptions = (email, code) => {
  let body = `
  <h2>Hey ${email}</h2>
  <p>Here's the email verification code:</p>
  <p style="font-weight: bold; font-size: 24px">${code}</p>
  <p>Please note that for added security this code becomes invalid after 10 minutes</p>
  <p>Stay Safe</p>`;

  return {
    body,
    subject: "EthioLingo: Email verifivation code",
    to: email,
    html: body,
    from: process.env.EMAIL_ADDRESS,
  };
};

export const sendEmail = (email, token)=>{
  const mailRequest = getMailOptions(email, token);
  getTransport().sendMail(mailRequest);
}

// sends password reset code and magiclink
export const sendResetEmail = async (email, code) =>{
  // create email body
  let body = `
  <h2>EthioLingo</h2>
  <p>Here's your password reset code:</p>
  <p style="font-weight: bold; font-size: 24px">${code}</p>
  <p>Please note that for added security this code becomes invalid after 5 minute</p>
  <p>Stay Safe</p>`;
  const options = {
    body,
    subject: "EthioLingo: Passowrd Reset Request",
    to: email,
    html: body,
    from: "EthioLingo",
  };
  getTransport().sendMail(options);
}

export const suspiciousActivityEmail = async (data)=>{
  const userEmail = data.email
  const body = `
  <h2>EthioLingo</h2>
  <p style="color: red; font-weight: bold;">Detected suspisious activity on you account!</p>
  <p>
  A user from:</p>
  <ul style="list-style: none;">
    <li>country: ${data.country}
    <li>region: ${data.region}
    <li>city: ${data.country}
  </ul>
  
  <p>have suspisiously tried to access your account on:</p>
    <ul style="list-style: none">
    <li>browser: ${data.browser}</li>
    <li>device: ${data.device}</li>
    <li>os: ${data.os}</li>
    </ul>
  <p>please reset your password for better security and take the necessary measures.</p>
  <p>Stay Safe</p>`;

  const options = {
    body,
    subject: "Ethio Lingo: Suspisious activity detected!!",
    to: userEmail,
    html: body,
    from: "EthioLingo",
  };
  getTransport().sendMail(options);
}
