const messageControllers = require('./messages.controllers')

const getAllMessages = (req, res) => { 
   messageControllers.findAllMessages()
      .then((data) => {
         res.status(200).json(data);
      })
      .catch((err) => {
         res.status(400).json({message: err.message});
      });
}
 
const getMessageById = (req, res) => {
   const id = req.params.message_id;
   messageControllers.findMessageById(id)
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

const postMessage = (req, res) => {
   const userId = req.user.id
   const conversationId = req.params.conversation_id
   const { message } = req.body
   messageControllers.createMessage({ userId, conversationId, message })
      .then((data) => {
         res.status(201).json(data)
      })
      .catch((err) => {
         res.status(400).json({message: err.message, fields: {
            message: 'text'
         }})
      })
}

const patchMessage = (req, res) => {
    const id = req.params.message_id;
    const { message } = req.body;
    messageControllers.updateMessage(id, { message })
       .then((data) => {
          if(data){
             res.status(200).json({message: 'Message Modified Sucesfully'})
          } else {
             res.status(404).json({message: 'Invalid ID'})
          }
       })
       .catch((err) => {
          res.status(400).json({message: err.message});
       });
}
 
const deleteMessage = (req, res) => {
    const id = req.params.message_id;
    messageControllers.deleteMessage(id)
       .then((data) => {
          if(data){
             res.status(204).json({message: 'Message Delete Sucesfully'})
          } else {
             res.status(404).json({message: 'Invalid ID'})
          }
       })
       .catch((err) => {
          res.status(400).json({message: err.message})
       });
}

module.exports = {
    getAllMessages,
    getMessageById,
    postMessage,
    patchMessage,
    deleteMessage
}