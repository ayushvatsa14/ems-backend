const employee=require("../models/employee");
const task=require("../models/task");

exports.addTask=async (req, res) => {
    try{
        const currentEmployee=await employee.findOne({email: req.body.assignTo});

        if(!currentEmployee){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        const newTask=await task.create({
            active: req.body.active,
            newTask: req.body.newTask,
            completed: req.body.completed,
            failed: req.body.failed,
            taskTitle: req.body.taskTitle,
            taskDescription: req.body.taskDescription,
            taskDate: req.body.taskDate,
            category:  req.body.category
        });

        if(!newTask){
            return res.status(400).json({
                success: false,
                message: "Task cannot be created"
            });
        }

        currentEmployee.tasks.push(newTask._id);
        currentEmployee.taskCounts.newTask=currentEmployee.taskCounts.newTask + 1;
        await currentEmployee.save();

        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            data: newTask
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}