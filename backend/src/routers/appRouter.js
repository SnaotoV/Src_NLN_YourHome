import express from 'express';
import app from '../controllers/appController';
import user from '../controllers/userController';
import motel from '../controllers/motelController';
import room from '../controllers/roomController';
import auth from '../services/auth';
import pay from '../controllers/payController';
const router = express.Router();

router.route('/login')
    .post(app.login)
router.route('/register')
    .post(app.register)

router.route('/user')
    .get(auth.verifyToken, user.findAll)
    .post(auth.verifyToken, user.create)
router.route('/user/:id')
    .get(auth.verifyToken, user.findOne)
    .put(auth.verifyToken, user.update)
    .delete(auth.verifyToken, user.deleteUser)

router.route('/user/motel')
    .get(auth.verifyToken, motel.findAll)
    .post(auth.verifyToken, motel.create)

router.route('/user/motel/:type/:id')
    .get(motel.findOneFromUser)
    .put(auth.verifyToken, motel.update)
    .delete(auth.verifyToken, motel.deleteMotel)

router.route('/user/room')
    .post(auth.verifyToken, room.registerRoom)
router.route('/user/room/:id')
    .get(auth.verifyToken, room.findOneRoom)
    .put(auth.verifyToken, room.editRegisterRoom);
router.route('/user/hire')
    .post(auth.verifyToken, room.createHire)
router.route('/user/hire/:id')
    .delete(auth.verifyToken, room.deleteRegister)
router.route('/hire')
    .post(auth.verifyToken, room.findOneRoom)
router.route('/hire/:id')
    .delete(auth.verifyToken, room.deleteHire)
router.route('/create/bill')
    .post(auth.verifyToken, room.addBill)
router.route('/bill/:year')
    .get(room.getBillInYear)

router.route('/pay/:id')
    .get(auth.verifyToken, room.findBill)
    .put(auth.verifyToken, room.updateBill)

router.route('/app/auth/token')
    .get(app.getNewKey);
router.route('/app/all-page')
    .post(app.allpage);
router.route('/app/:type/:page')
    .put(app.dataInPage);
router.route('/create_payment_url')
    .post(auth.verifyToken, pay.createPaymentUrl);
router.route('/vnpay_check')
    .get(pay.checkPayment)
module.exports = router;