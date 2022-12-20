const conversationControllers = require('./conversations.controllers')

const getAllConversations = (req, res) => { 
    conversationControllers.findAllConversations()
       .then((data) => {
          res.status(200).json(data);
       })
       .catch((err) => {
          res.status(400).json({message: err.message});
       });
}
 
const getConversationById = (req, res) => {
    const id = req.params.conversation_id;
    conversationControllers.findConversationById(id)
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

const postConversation = (req, res) => {
    const {title, image_url, participantId} = req.body
    const ownerId = req.user.id
    conversationControllers.createConversation({title, image_url, participantId, ownerId})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
               title: 'String',
               image_url: 'String',
               participantId: 'UUID'
           }})
        })
}

const patchConversation = (req, res) => {
    const id = req.params.conversation_id;
    const {title, image_url} = req.body;
    conversationControllers.updateConversation(id, {title, image_url})
       .then((data) => {
          if(data){
             res.status(200).json({message: 'Conversation Modified Sucesfully'});
          } else {
             res.status(404).json({message: 'Invalid ID'});
          }
       })
       .catch((err) => {
          res.status(400).json({message: err.message});
       });
}
 
const deleteConversation = (req, res) => {
    const id = req.params.conversation_id;
    conversationControllers.deleteConversation(id)
       .then((data) => {
          if(data){
             res.status(204).json({message: 'Conversation Delete Sucesfully'});
          } else {
             res.status(404).json({message: 'Invalid ID'});
          }
       })
       .catch((err) => {
          res.status(400).json({message: err.message});
       });
}

module.exports = {
    getAllConversations,
    postConversation,
    getConversationById,
    patchConversation,
    deleteConversation
}