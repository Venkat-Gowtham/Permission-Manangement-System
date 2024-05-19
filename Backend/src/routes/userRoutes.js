// userRoutes.js
const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/UserController');

// Define routes
Router.post('/api/RequestPermission', UserController.addUser);
Router.get('/api/getdata', UserController.getUsersByDate);

Router.get('/api/pending',UserController.getPending);
Router.get('/api/getallpermissions',UserController.getAllPermissionsData);
Router.get('/api/AllPermissions',UserController.AllStatus);
Router.post('/api/getAcceptorDeniedList',UserController.getAcceptorDeniedList)

Router.post('/api/updateStatus',UserController.ChangeStatus);

// trainer logins 
// login 
Router.post('/api/requestLogin',UserController.requestLogin);

// add trainer 
Router.post('/api/createUser', UserController.createUser);
// Router.post('/api/createUser',UserController.createUser);

module.exports = Router;
