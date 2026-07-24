import Employee from '../models/Employee.js';

export const getDashboardStats = async () => {
    const totalEmployees = await Employee.countDocuments();
    
    // Status counts
    const statusCounts = await Employee.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Department counts
    const departmentCounts = await Employee.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } }
    ]);

    // Employees joined this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const joinedThisMonth = await Employee.countDocuments({
        joiningDate: { $gte: startOfMonth }
    });

    // Historical joined trend (group by Year and Month)
    const monthlyJoined = await Employee.aggregate([
        {
            $group: {
                _id: { 
                    year: { $year: "$joiningDate" }, 
                    month: { $month: "$joiningDate" } 
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    // Format historical data
    const monthlyJoinedFormatted = monthlyJoined.map(item => {
        const monthName = new Date(item._id.year, item._id.month - 1).toLocaleString('default', { month: 'short' });
        return {
            name: `${monthName} ${item._id.year}`,
            value: item.count
        };
    });

    const formatCounts = (arr) => arr.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    return {
        totalEmployees,
        statusCounts: formatCounts(statusCounts),
        departmentCounts: formatCounts(departmentCounts),
        joinedThisMonth,
        monthlyJoined: monthlyJoinedFormatted
    };
};
