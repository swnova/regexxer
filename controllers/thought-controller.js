const { Thought, User } = require('../models');

module.exports = {

    getThoughts(req, res){
        Thought.find({})
        populate({
            path: 'reactions',
            select: '-__v',
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    getSingleThought({params}, res) {
        Thought.findOne({_id: params.id})
        populate({
            path: 'reactions',
            select: '-__v',
        })
        .select("-__v")
        .then((dbThoughtData)=>
            !dbThoughtData
                ? res.status(404).json({message: 'no thought associated with that ID'})
                : res.json(dbThoughtData)
        )
        .catch((err) => res.status(500).json(err));
    
    },

    newThought({body}, res) {
        Thought.create(body)
        .then((thoughtData)=>{
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: { thougts: thoughtData._id}},
                {new: true}
            );
        })
        .then((dbUserData)=>
            !dbUserData
                ? res.status(404).json({message: 'No user associated with that ID'})
                : res.json(dbUserData)
        )
        .catch((err) => res.status(500).json(err));
    },

    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id}, body,
            {new:true})
            .then((dbThoughtData)=>
            !dbThoughtData
            ? res.status(404).json({message:'No thought associated with that ID!'})
            :res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
        },

        deleteThought({params}, res){
            Thought.findOneAndDelete({_id: params.id})
            .then((dbThoughtData)=>
            !dbThoughtData
            ? res.status(404).json({message:'No thought associated with that ID!'})
            :res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
        },

        newReaction({params, body}, res) {
            Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$addToSet: {reactions: body}},
                {new: true}
            )
            .then((dbThoughtData)=>
            !dbThoughtData
            ? res.status(404).json({message:'No thought associated with that ID!'})
            :res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
        },

        deleteReaction({params}, res){
            Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull: {reactions: {reactionId: params.reactionId}}},
                {new: true}
            )
            .then((dbThoughtData)=>
            !dbThoughtData
            ? res.status(404).json({message:'No thought associated with that ID!'})
            :res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
        }
 };
        

