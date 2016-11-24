var express = require('express');
var router = express.Router();
var terminalController = require('../controller/TerminalController');

router.get('/', terminalController.index);
router.post('/api/errors', terminalController.postError);

module.exports = router;