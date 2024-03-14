import express from 'express';
import app from '../controllers/appController'
import user from '../controllers/userController'
const router = express.Router();

router.route('/login')
    .post(app.login)
router.route('/register')
    .post(app.register)

router.route('/user')
    .get(user.findAll)
    .post(user.create)
router.route('/user/:id')
    .get(user.findOne)
    .put(user.update)
module.exports = router;