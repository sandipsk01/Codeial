const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log('Router Loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));    // "/users" sent to "./users"

//for any other routes, access from here
//router.use('/routerName',require('./routeFile'));

module.exports=router;