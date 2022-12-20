const Participants = require('../models/participants.models')
const uuid = require('uuid');

const findParticipantConverstions = async (userId, conversationId) => {
    const data = await Participants.findOne({
        where: {
            userId: userId,
            conversationId: conversationId
        }
    })
    return data
}

const findAllParticipants = async () => {
    const data = await Participants.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const findParticipantById = async (id) => {
    const data = await Participants.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id: id
        }
    })
    return data
}

const createParticipant = async (obj) => {
    const data = await Participants.create({
        id: uuid.v4(),
        conversationId: obj.conversationId,
        userId: obj.userId,
    })
    return data
}

const updateParticipant = async (id, obj) => {
    const data = await Participants.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteParticipant = async (id) => {
    const data = await Participants.destroy({
        where: {
            id: id
        }
    })
    return data;
}

module.exports = {
    findParticipantConverstions,
    findAllParticipants,
    findParticipantById,
    createParticipant,
    updateParticipant,
    deleteParticipant,
}
