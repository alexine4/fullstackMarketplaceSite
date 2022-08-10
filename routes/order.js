const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()

router.post('/',passport.authenticate('jwt', { session: false }), controller.create)
router.get('/',passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/allOrders/:idOrder',passport.authenticate('jwt', { session: false }), controller.getAllByOrder)
router.get('/:orderStatus',passport.authenticate('jwt', { session: false }), controller.getActual)
router.get('/orderStatus/:orderStatus',passport.authenticate('jwt', { session: false }), controller.getActualOrder)
router.patch('/:orderStatus',passport.authenticate('jwt', { session: false }), controller.update)
router.patch('/orderList/update',passport.authenticate('jwt', { session: false }), controller.updateList)
router.delete('/orderList/:id',passport.authenticate('jwt', { session: false }), controller.remove)

module.exports= router