const route = require('express').Router();
const appController = require("../controllers/app.controller")
const FileUploader = require('../helper/fileUpload');

route.get('/add-dev', appController.getForm);
route.post('/submit-form', appController.submitForm);
route.get('/', appController.getList);
route.get('/export-csv', appController.exportCSV);

module.exports = route;