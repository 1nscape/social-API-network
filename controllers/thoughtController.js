const { User, Thought } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => (
                !thought
                    ? res.status(404).json({ message: 'No thought found' })
                    : res.json(thought)
            )
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => !thoughtData ? res.status(404).json('User cannot be found')
                : User.findOneAndUpdate({ _id: req.body.userId },
                    { $addToSet: 
                    { thoughts: thoughtData._id } },
                    { runValidators: true, new: true },
                ))
            .then(() => res.json({ message: 'Thought has been added' }))
            .catch((err) => res.status(500).json(err));  
          
    },
    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body},
            { runValidators: true, new: true },
        )
    .then(() => res.json({ message: 'Thought has been updated' }))
    .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(() => res.json({ message:'Thought has been deleted' }))
        .catch((err) => res.status(500).json(err));
    },
};