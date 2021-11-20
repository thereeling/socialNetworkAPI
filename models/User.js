const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: 'Username is Required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
    if(this.friends){
        return this.friends.length;
    }
    else{
        return;
    }
    
});

const User = model('User', UserSchema);

module.exports = User;
