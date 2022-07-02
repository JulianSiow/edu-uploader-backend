const router = require('express').Router();

const files = require('../controllers/files.controller.js');

//upload route
router.post('/upload', files.upload)

//get all files route
router.get('/files', files.getFiles)

//download file
router.get('/files/:fileName', files.downloadFile)

module.exports = router