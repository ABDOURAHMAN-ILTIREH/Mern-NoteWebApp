const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
// exports all controller function
const {
    getAllTodolists,
    addNewTodoList,
    DeleteTodoList
} = require('../controller/TodoListController')

router.use(requireAuth)
// get all TodoList
router.get('/', getAllTodolists)

// add a new todo list 
router.post('/', addNewTodoList)

// remove a todo list
router.delete('/:id', DeleteTodoList)



module.exports = router;