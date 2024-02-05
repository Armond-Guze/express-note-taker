const router = require('express').Router();

const htmlRouter = require('./html-routes')
const apiRouter = require('./api');

router.use('/', htmlRouter);
router.use('/api', apiRouter);

module.exports = router;