const router = require('express').Router()

const participantServices = require('./participants.services')
const passportJWT = require('../middlewares/auth.middleware')
const { use } = require('chai')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), participantServices.getParticipantConversation)
    .get(passportJWT.authenticate('jwt', {session: false}), participantServices.getAllParticipants)
    .post(passportJWT.authenticate('jwt', {session: false}), participantServices.postParticipant)

router.route('/:id')
    .get(passportJWT.authenticate('jwt', {session: false}), participantServices.getParticipantById)
    .patch(passportJWT.authenticate('jwt', {session: false}), participantServices.patchParticipant)
    .delete(passportJWT.authenticate('jwt', {session: false}), participantServices.deleteParticipant)

module.exports = router
