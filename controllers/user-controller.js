const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find({})
        .select('-_v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({path: 'thoughts', select: '-_v'})
        .select('-_v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err=>{
            res.sendStatus(400)
        });

    },

    createUser({body}, res) {
        User.create(body)
        .then(dbUserData=> res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbUserData=>{
            if (!dbUserData) {
                res.status(400).json({message: "User with that id doesn't exist"});
            return;
        }
        res.json(dbUserData);
        })
        .catch(err=>res.json(err));
    },

    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then((dbUserData)=>{
            if (!dbUserData) {
                res.status(400).json({message: "User with that id doesn't exist"});
                return
            }
            res.json(dbUserData);
            })
            .catch(err=>res.json(err));

    },
    
}