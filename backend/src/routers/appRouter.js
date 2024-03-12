import express from 'express';
import app from '../controllers/appController'
const router = express.Router();

router.route('/login')
    .post(app.login)
router.route('/register')
    .post(app.register)
module.exports = router;