const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');
const upload = require('../middleware/upload');

router.post('/', upload.array('media', 5), submitContactForm);

module.exports = router;
