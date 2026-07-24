import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    department: {
        type: String,
        required: [true, 'Please add a department'],
        enum: ['HR', 'Development', 'QA', 'Finance', 'Marketing', 'DevOps', 'Sales', 'Design']
    },
    designation: {
        type: String,
        required: [true, 'Please add a designation']
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive', 'Notice Period', 'Resigned'],
        default: 'Active'
    },
    joiningDate: {
        type: Date,
        required: [true, 'Please add a joining date']
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    salary: {
        type: Number,
        required: [true, 'Please add a salary']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
