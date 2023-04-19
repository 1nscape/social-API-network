const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            max_length: 50,
            trim: true,
            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please make sure email matches']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
        ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
        ],
    },
        {
            toJSON: {
              virtuals: true,  
            },
            id: false,
        },
);


userSchema.virtual('friendsCount').get(function () {
    return this.friends.legnth;
});

const User = model('user', userSchema);


module.exports = User;

