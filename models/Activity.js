import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['EMPLOYEE_CREATED', 'EMPLOYEE_UPDATED', 'EMPLOYEE_DELETED', 'STATUS_CHANGED', 'DEPARTMENT_CHANGED', 'SYSTEM_EVENT']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: false
    },
    employeeName: {
        type: String,
        required: false
    }
}, {
    timestamps: true 
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
