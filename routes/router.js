const express=require('express');
const router=express.Router();

const {login}=require('../controllers/login.js');
const {adminSignUp}=require('../controllers/adminSignUp.js');
const {employeeSignUp}=require('../controllers/employeeSignUp.js');
const {auth, isEmployee, isAdmin}=require('../middlewares/auth.js');
const {getUserData}=require('../controllers/getUserData.js');
const {addTask}=require('../controllers/AddTask.js');
const {fetchAllTasks}=require('../controllers/fetchAllTask.js');
const {markCompleted}=require('../controllers/markCompleted.js');
const {markFailed}=require('../controllers/markFailed.js');
const {acceptTask}=require('../controllers/acceptTask.js');

router.post('/login', login);
router.post('/adminsignup', adminSignUp);
router.post("/employeesignup", employeeSignUp);
router.post('/getuser', getUserData);
router.post('/addnewtask', auth, addTask);
router.post('/fetchalltasks', auth, fetchAllTasks);
router.post('/markcompleted', auth, markCompleted);
router.post('/markfailed', auth, markFailed);
router.post('/accepttask', auth, acceptTask);

router.get('/employee', auth, isEmployee, (req, res) => {
    res.status(200).json({
        status: true,
        message: "Welcome to protected route for employee"
    })
});

router.get('/admin', auth, isAdmin, (req, res) => {
    res.status(200).json({
        status: true,
        message: "Welcome to protected route for admin"
    })
});

module.exports=router;