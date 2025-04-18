// gmailSender.js
import dotenv from 'dotenv';
dotenv.config();
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID, process.env.CLIENT_SECRET, REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function sendMail({ to, subject, text }) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.PRIVATE_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const mailOptions = {
    from: `Felipe Calle <${process.env.PRIVATE_EMAIL}>`,
    to,
    subject,
    text,
  };

  const result = await transport.sendMail(mailOptions);
  return result;
}
