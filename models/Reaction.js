const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'A reaction body is required',
        min: 1,
        max: 280
    },
    username: {
        type: String,
        required: 'A user is required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

module.exports = ReactionSchema;