const { User } = require('../models');
const { Thoughts } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

    createThought({ params, body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err));
    },

    createReaction({ params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            {runValidators: true, new: true}
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No Thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
    },

    deleteReaction({ params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: body.reactionId}},
            {runValidators: true, new: true}
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No Thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));

    }

};

module.exports = thoughtsController;