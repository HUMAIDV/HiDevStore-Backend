import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// const {KindeClient, GrantType} = require("@kinde-oss/kinde-nodejs-sdk");
import { KindeClient, GrantType } from '@kinde-oss/kinde-nodejs-sdk';

const options = {
  domain: process.env.KINDE_DOMAIN,
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  redirectUri: process.env.KINDE_REDIRECT_URI,
  logoutRedirectUri: process.env.KINDE_LOGOUT_REDIRECT_URI,
  grantType: GrantType.PKCE
};

// console.log("options: ", options);


const kindeClient = new KindeClient(options);

const kindeRouter = express.Router();

kindeRouter.get("login", kindeClient.login(), (req, res) => {
    return res.redirect("/");
  });
  
kindeRouter.get("/register", kindeClient.register(), (req, res) => {
    return res.redirect("/");
});

kindeRouter.get("/callback", kindeClient.callback(), (req, res) => {
    return res.redirect("/");
});

// kindeRouter.get("/logout", client.logout());

export default kindeRouter;
