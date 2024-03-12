import express from 'express';
import user from '../controllers/userController'
const router = express.Router();

router.route('/')
    .get(user.findAll)
    .post(user.create)
    .delete(user.deleteAll);
router.route('/:id')
    .get(user.findOne)
    .put(user.update)
    .delete(user.deleteUser);

module.exports = router;