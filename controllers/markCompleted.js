const task=require('../models/task');
const employee=require('../models/employee');

exports.markCompleted=async(req, res) => {
    try{
        const employeeId=req.body.employee_id;
        const taskId=req.body.task_id;

        if(!employeeId){
            return res.status(400).json({
                success: false,
                message: "Employee id not found"
            });
        }

        if(!taskId){
            return res.status(400).json({
                success: false,
                message: "Task id not found"
            });
        }

        const employeeData=await employee.findOne({_id: employeeId}).populate('tasks');
        const employeeTask=await task.findOne({_id: taskId});

        if(!employeeData){
            return res.status(400).json({
                success: false,
                message: "Employee not found"
            });
        }

        if(!employeeTask){
            return res.status(400).json({
                success: false,
                message: "Task not found"
            });
        }

        employeeTask.active=false;
        employeeTask.completed=true;
        await employeeTask.save();

        employeeData.taskCounts.active=employeeData.taskCounts.active-1;
        employeeData.taskCounts.completed=employeeData.taskCounts.completed + 1;
        await employeeData.save();

        const updatedEmployeeData = await employee.findOne({ _id: employeeId }).populate('tasks');
        updatedEmployeeData.password='';

        return res.status(200).json({
            success: true,
            message: "Task marked completed successfully",
            data: updatedEmployeeData
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}