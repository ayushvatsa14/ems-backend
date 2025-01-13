const task=require('../models/task');

exports.fetchAllTasks=async(req, res) => {
    try{
        const tasks=await task.find();

        if(!tasks){
            return res.status(400).json({
                success: false,
                message: "Tasks cannot be fetched"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
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