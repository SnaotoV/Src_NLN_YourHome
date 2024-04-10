import express from 'express';
import app from '../controllers/appController'
import user from '../controllers/userController'
import motel from '../controllers/motelController';
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

router.route('/user/motel')
    .get(motel.findAll)
    .post(motel.create)
router.route('/user/motel/:user/:id')
    .get(motel.findOneFromUser)
    .put(motel.update)


router.route('/app/all-page')
    .post(app.allpage);
router.route('/app/:type/:page')
    .put(app.dataInPage)

module.exports = router;