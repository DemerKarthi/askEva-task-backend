import * as employeeService from '../services/employeeService.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

// @desc    Get all employees
// @route   GET /api/v1/employees
// @access  Private
export const getEmployees = async (req, res) => {
    try {
        const result = await employeeService.getEmployeesQuery(req.query);
        return successResponse(res, 200, 'Employees retrieved successfully', result.employees, result.pagination);
    } catch (error) {
        return errorResponse(res, 500, 'Server error retrieving employees', error.message);
    }
};

// @desc    Get single employee
// @route   GET /api/v1/employees/:id
// @access  Private
export const getEmployee = async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (!employee) {
            return errorResponse(res, 404, 'Employee not found');
        }
        return successResponse(res, 200, 'Employee retrieved successfully', employee);
    } catch (error) {
        return errorResponse(res, 500, 'Server error retrieving employee', error.message);
    }
};

// @desc    Create new employee
// @route   POST /api/v1/employees
// @access  Private
export const createEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        return successResponse(res, 201, 'Employee created successfully', employee);
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse(res, 400, 'Email already exists');
        }
        return errorResponse(res, 400, 'Error creating employee', error.message);
    }
};

// @desc    Update employee
// @route   PUT /api/v1/employees/:id
// @access  Private
export const updateEmployee = async (req, res) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
        if (!employee) {
            return errorResponse(res, 404, 'Employee not found');
        }
        return successResponse(res, 200, 'Employee updated successfully', employee);
    } catch (error) {
        return errorResponse(res, 400, 'Error updating employee', error.message);
    }
};

// @desc    Delete employee
// @route   DELETE /api/v1/employees/:id
// @access  Private/Admin
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await employeeService.deleteEmployee(req.params.id);
        if (!employee) {
            return errorResponse(res, 404, 'Employee not found');
        }
        return successResponse(res, 200, 'Employee removed successfully', {});
    } catch (error) {
        return errorResponse(res, 500, 'Error deleting employee', error.message);
    }
};
