import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from '../models/User.js';
import Employee from '../models/Employee.js';

dotenv.config({ path: '../.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();

    try {
        await User.deleteMany();
        await Employee.deleteMany();

        // 1. Create Admin User
        await User.create({
            name: 'Admin User',
            email: 'admin@company.com',
            password: 'Admin@123',
            role: 'Admin'
        });
        console.log('Admin user created');

        // 2. Create 30 Employees
        const departments = ['HR', 'Development', 'QA', 'Finance', 'Marketing', 'DevOps', 'Sales', 'Design'];
        const statuses = ['Active', 'Inactive', 'Notice Period', 'Resigned'];
        const designations = ['Manager', 'Developer', 'Analyst', 'Specialist', 'Lead', 'Consultant'];

        const employees = [];

        for (let i = 0; i < 30; i++) {
            employees.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                department: faker.helpers.arrayElement(departments),
                designation: faker.helpers.arrayElement(designations),
                status: faker.helpers.arrayElement(statuses),
                joiningDate: faker.date.past({ years: 5 }),
                phone: faker.phone.number(),
                salary: faker.number.int({ min: 30000, max: 150000 }),
                address: faker.location.streetAddress({ useFullAddress: true })
            });
        }

        await Employee.insertMany(employees);
        console.log('30 Employees seeded successfully');

        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error}`);
        process.exit(1);
    }
};

importData();
