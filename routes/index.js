import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

// Rotas para usuários
router.get('/users', getAllUsers);
router.post('/users', createUser);

export default router;
