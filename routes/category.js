const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/category')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id',passport.authenticate('jwt', { session: false }), controller.getById)
router.delete('/:id',passport.authenticate('jwt', { session: false }), controller.remove)
router.post('/',upload.single('image') ,passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/:id',upload.single('image') ,passport.authenticate('jwt', { session: false }), controller.update)

module.exports= router