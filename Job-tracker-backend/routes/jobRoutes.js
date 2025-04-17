const express = require('express');
const requireAuth = require('../middleware/authMiddleware')
const {
    searchJobs,
    saveJob,
    getSavedJobs,
    updateJob,
    deleteJob
} = require('../controllers/jobController');

const router = express.Router();
router.use(requireAuth);

router.get('/search',searchJobs);
router.post('/save',saveJob);
router.get('/saved',getSavedJobs);
router.put('/:id',updateJob);
router.delete('/:id',deleteJob);

module.exports = router;