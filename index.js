const router = require('express').Router();
const api = require('./api');

router.use('/api', api);
router.use((req, res) =>
{ 
res.send('The route is incorrect')});

module.exports = router;