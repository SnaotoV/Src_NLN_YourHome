import express from 'express';
import app from '../controllers/appController';
import user from '../controllers/userController';
import motel from '../controllers/motelController';
import room from '../controllers/roomController';
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

router.route('/user/motel/:type/:id')
    .get(motel.findOneFromUser)

router.route('/user/room')
    .post(room.registerRoom)
router.route('/user/room/:id')
    .get(room.findOneRoom)
    .put(room.editRegisterRoom);
router.route('/user/hire')
    .post(room.createHire)
router.route('/hire')
    .post(room.findOneRoom)


router.route('/app/all-page')
    .post(app.allpage);
router.route('/app/:type/:page')
    .put(app.dataInPage)

module.exports = router;