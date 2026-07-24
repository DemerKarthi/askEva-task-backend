import express from 'express';
import { 
    getEmployees, 
    getEmployee, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} from '../controllers/employeeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getEmployees)
    .post(protect, admin, createEmployee);

router.route('/:id')
    .get(protect, getEmployee)
    .put(protect, admin, updateEmployee)
    .delete(protect, admin, deleteEmployee);

export default router;
