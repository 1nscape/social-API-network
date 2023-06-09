const router = require('express').Router();
const { 
    getUsers,
    createUser, 
    getSingleUser, 
    addUser, 
    updateUser, 
    deleteUser, 
    removeUser 
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
   .post(addUser)
   .delete(removeUser);

module.exports = router;