const bcrypt = require("bcrypt");
const employee = require("../models/employee");

exports.employeeSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, and password) are required",
            });
        }

        const existingEmployee = await employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                message: "Employee with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await employee.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Employee registered successfully",
            data: {
                id: newEmployee._id,
                name: newEmployee.name,
                email: newEmployee.email,
                role: newEmployee.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during the registration process"
        });
    }
};
