const { User, Thought } = require('../models');

module.exports = {

    getUsers(req, res) {
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

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId },
            { $set: 
            { friends: req.body.friends } },
            { runValidators: true, new: true })
            .then((user) => !user ? res.status(404).json('User cannot be found')
                : res.json(user))
            .catch((err) => res.status(500).json(err));

    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User cannot be found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: 
            { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User cannot be found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User cannot be found' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};