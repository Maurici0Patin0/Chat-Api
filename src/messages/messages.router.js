const router = require('express').Router()

const messageServices = require('./messages.services')
const passportJWT = require('../middlewares/auth.middleware')
const { use } = require('chai')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getAllMessages)
    .post(passportJWT.authenticate('jwt', {session: false}), messageServices.postMessage)

router.route('/:id')
    .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getMessageById)
    .patch(passportJWT.authenticate('jwt', {session: false}), messageServices.patchMessage)
    .delete(passportJWT.authenticate('jwt', {session: false}), messageServices.deleteMessage)

module.exports = router
