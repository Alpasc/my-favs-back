// import router
const tableRouter = require('express').Router();
// describe route here
tableRouter.get('/', TableController.MethodSample);
// describe all routes you want here and call th right controller
module.exports tableRouter;