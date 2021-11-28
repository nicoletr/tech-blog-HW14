const router = require('express').Router();
const apiRoutes = require('./apis');
const homepageRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homepageRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;