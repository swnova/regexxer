const { Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true, 
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt:{
            timestamps: true,
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false,
    }
);


const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        timestamps: true
    }
    },
    {
        toJson: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);


module.exports = Thought;