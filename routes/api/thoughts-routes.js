const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThoughts,
    createReaction,
    deleteReaction,    
} = require('../../controllers/thoughts-controller');
const { route } = require('./users-routes');

// /api/thoughts

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// /api/thoughts/:id

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThoughts)

// /api/thoughts/:thoughtId/reactions

router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router;
