const employee=require('../models/employee');
const admin=require('../models/admin');

exports.getUserData=async(req, res) => {
    try{
        const {email} = req.body;
        
        const existingEmployee = await employee.findOne({ email }).lean().populate('tasks');
        const existingAdmin = await admin.findOne({ email }).lean();

        if (!existingEmployee && !existingAdmin) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            });
        }

        const data = existingEmployee || existingAdmin; 
        res.status(200).json({
            success: true,
            data: data,
            message: 'User set Successfully'
        });  
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}