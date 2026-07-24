import Employee from '../models/Employee.js';

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

export const createEmployee = async (data) => {
    return await Employee.create(data);
};

export const updateEmployee = async (id, data) => {
    return await Employee.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteEmployee = async (id) => {
    return await Employee.findByIdAndDelete(id);
};
