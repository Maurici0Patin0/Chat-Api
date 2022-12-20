const uuid = require('uuid');
const Conversations = require('../models/Conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

//aqui se crea una nuevaconversacion y dos participantes
const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        image_url: obj.image_url,
        userId: obj.ownerId, // crea la convercaion 
    })
    const participante1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId,  // este es el owner que viene desde el token 
        conversationId: newConversation.id
    })
    const participante2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,//Este usuario viene desde el body
        conversationId: newConversation.id
    })

    return{  
    newConversation,
    participante1,
    participante2
    }
}

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        /*include: {
            model: Participants,
            include: {
                model: Users
            }
        },*/
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id: id
        },
        /*include: {
            model: Participants,
            include: {
                model: Users
            }
        }*/
    })
    return data
}
const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}
const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id,
           
        }
    })
    return data;
}

module.exports = {
    findAllConversations,
    findConversationById,
    createConversation,
    updateConversation,
    deleteConversation
}
