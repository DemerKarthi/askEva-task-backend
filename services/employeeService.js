import Employee from '../models/Employee.js';
import { logActivity } from './activityService.js';

export const getEmployeesQuery = async (queryStruct = {}) => {
    const { 
        page = 1, 
        limit = 10, 
        search = '', 
        department = '', 
        status = '', 
        sortBy = 'createdAt', 
        sortOrder = 'desc' 
    } = queryStruct;

    const query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    if (department) {
        query.department = department;
    }

    if (status) {
        query.status = status;
    }

    const sortConfig = {};
    sortConfig[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const employees = await Employee.find(query)
        .sort(sortConfig)
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Employee.countDocuments(query);

    return {
        employees,
        pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / parseInt(limit))
        }
    };
};

export const getEmployeeById = async (id) => {
    return await Employee.findById(id);
};

export const createEmployee = async (data, user) => {
    const employee = await Employee.create(data);
    
    // Auto-Log
    await logActivity({
        type: 'EMPLOYEE_CREATED',
        title: 'Employee Added',
        description: `${employee.name} was added to ${employee.department}.`,
        performedBy: user?._id,
        employeeId: employee._id,
        employeeName: employee.name
    });

    return employee;
};

export const updateEmployee = async (id, data, user) => {
    const oldEmployee = await Employee.findById(id);
    const employee = await Employee.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (employee && oldEmployee) {
        let desc = `${employee.name}'s profile was updated.`;
        let type = 'EMPLOYEE_UPDATED';

        if (oldEmployee.department !== employee.department) {
            type = 'DEPARTMENT_CHANGED';
            desc = `${employee.name} was moved to ${employee.department}.`;
        } else if (oldEmployee.status !== employee.status) {
            type = 'STATUS_CHANGED';
            desc = `${employee.name}'s status changed to ${employee.status}.`;
        }

        await logActivity({
            type,
            title: 'Employee Updated',
            description: desc,
            performedBy: user?._id,
            employeeId: employee._id,
            employeeName: employee.name
        });
    }
    
    return employee;
};

export const deleteEmployee = async (id, user) => {
    const employee = await Employee.findByIdAndDelete(id);
    
    if (employee) {
        await logActivity({
            type: 'EMPLOYEE_DELETED',
            title: 'Employee Removed',
            description: `${employee.name} was removed from the organization.`,
            performedBy: user?._id,
            employeeId: employee._id,
            employeeName: employee.name
        });
    }

    return employee;
};
