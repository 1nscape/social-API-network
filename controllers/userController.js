const { User, Thought } = require('../models');

module.exports = {
    
    getUsers (req, res) {
        User.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'User does not exist' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    
};

