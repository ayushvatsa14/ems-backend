const admin = require("../models/admin");
const bcrypt = require("bcrypt");

exports.adminSignUp=async(req, res) => {
    try{
        const {name, email, password}=req.body;

        if(!name || !email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields required"
            });
        }

        const existingUser=await admin.findOne({email: email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user=await admin.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Admin cannot be created, ${error.message}`
        });
    }
}