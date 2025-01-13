const employee = require('../models/employee.js');
const admin = require('../models/admin.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingEmployee = await employee.findOne({ email }).lean().populate('tasks');
        const existingAdmin = await admin.findOne({ email }).lean();

        if (!existingEmployee && !existingAdmin) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            });
        }

        const data = existingEmployee || existingAdmin;

        const payload = {
            email: data.email,
            id: data._id,
            role: data.role
        };
        if (await bcrypt.compare(password, data.password)) {
            let token = jwt.sign(payload, process.env.Secret_Key, {
                expiresIn: '2h'
            });

            data.token = token;
            data.password = undefined;

            res.status(200).json({
                success: true,
                data: data,
                message: 'Logged In Successfully'
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
