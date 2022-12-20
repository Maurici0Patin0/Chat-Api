const participantControllers = require('./participants.controllers')

const getParticipantConversation = (req, res) => { 
   participantControllers.findParticipantConverstions()
      .then((data) => {
         res.status(200).json(data);
      })
      .catch((err) => {
         res.status(400).json({message: err.message});
      });
}

const getAllParticipants = (req, res) => { 
   participantControllers.findAllParticipants()
      .then((data) => {
         res.status(200).json(data);
      })
      .catch((err) => {
         res.status(400).json({message: err.message});
      });
}
 
const getParticipantById = (req, res) => {
   const id = req.params.id;
   participantControllers.findParticipantById(id)
      .then((data) => {
         if(data){
            res.status(200).json(data);
         } else {
            res.status(404).json({message: 'Invalid ID'});
         }
      })
      .catch((err) => {
         res.status(400).json({message: err.message});
      });
}

const postParticipant = (req, res) => {
   const { conversationId, userId } = req.body
   // const userId = req.user.id
   participantControllers.createParticipant({ conversationId, userId })
      .then((data) => {
         res.status(201).json(data)
      })
      .catch((err) => {
         res.status(400).json({message: err.message})
      })
}

const patchParticipant = (req, res) => {
    const id = req.params.id;
    const { conversationId, userId } = req.body;
    participantControllers.updateParticipant(id, { conversationId, userId })
       .then((data) => {
          if(data){
             res.status(200).json({message: 'Participant Modified Sucesfully'});
          } else {
             res.status(404).json({message: 'Invalid ID'});
          }
       })
       .catch((err) => {
          res.status(400).json({message: err.message});
       });
}
 
const deleteParticipant = (req, res) => {
    const id = req.params.id;
    participantControllers.deleteParticipant(id)
       .then((data) => {
          if(data){
             res.status(204).json({message: 'Participant Delete Sucesfully'});
          } else {
             res.status(404).json({message: 'Invalid ID'});
          }
       })
       .catch((err) => {
          res.status(400).json({message: err.message});
       });
}

module.exports = {
   getParticipantConversation,
    getAllParticipants,
    getParticipantById,
    postParticipant,
    patchParticipant,
    deleteParticipant,
}