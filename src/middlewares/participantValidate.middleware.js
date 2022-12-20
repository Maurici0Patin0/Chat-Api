
const { findParticipantConverstions } = require('../participants/participants.controllers')

const participantValidate = (req, res, next) => {
   const conversationId = req.params.conversation_id
   const userId = req.user.id

   findParticipantConverstions(userId, conversationId)
      .then(data => {
         if(data){
            next()
         } else {
            res.status(401).json({message: "you're not participant from this conversation"})
         }
      })
      .catch(err => {
         res.status(400).json({message: err.message})
      })
}

module.exports = participantValidate