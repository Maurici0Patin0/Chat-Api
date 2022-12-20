const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Participants = require('./participants.models')
const Messages = require('./messages.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    RecoveryPasswords.belongsTo(Users)
    Users.hasMany(RecoveryPasswords)

    //? FK = Conversations
    Conversations.belongsTo(Users)
    Users.hasMany(Conversations)

    //? FK = Participants
    Participants.belongsTo(Users)
    Users.hasMany(Participants)

    //? FK = Messages
    Messages.belongsTo(Users)
    Users.hasMany(Messages)

    //? FK = Participants
    Participants.belongsTo(Conversations, {
        onDelete: 'CASCADE',
    })
    Conversations.hasMany(Participants)

    //? FK = Messages
    Messages.belongsTo(Conversations)
    Conversations.hasMany(Messages)

}

module.exports = initModels