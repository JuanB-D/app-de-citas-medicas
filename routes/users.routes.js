import express from 'express';
import userAuthController from '../controllers/users.controller.js';
const usersAuthRoutes = express.Router();

usersAuthRoutes
.post('/Reg&ster', userAuthController.Register)
.post('/Log&n', userAuthController.Login)
.delete('/DeleteAccount', userAuthController.deleteAccount)
.post('/UserData', userAuthController.userData)

export default usersAuthRoutes;