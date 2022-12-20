const Messages = require('../models/messages.models')
const uuid = require('uuid');

const findAllMessages = async () => {
    const data = await Messages.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const findMessageById = async (id) => {
    const data = await Messages.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id: id
        }
    })
    return data
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message,
    })
    return data
}

const updateMessage = async (id, obj) => {
    const data = await Messages.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data;
}

module.exports = {
    findAllMessages,
    findMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
}
