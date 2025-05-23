import { Router } from 'express'
import { body, param } from 'express-validator'
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../handlers/post.handler'
import { handleInputErrors } from '../middleware'
import { verifyToken } from '../handlers/jwt.handler'

const routerPost = Router()

routerPost.get('/', verifyToken, getPosts)

routerPost.get('/:id', 
    param('id').isInt().withMessage('ID no válido, debe ser numerico'),
    handleInputErrors,
    verifyToken,
    getPostById
)

routerPost.post('/', 
    body("mensaje").exists().withMessage("La propiedad mensaje debe ser enviada"),
    body("mensaje").notEmpty().withMessage("El mensaje no puede ir vacio"),
    handleInputErrors,
    verifyToken,
    createPost
)

routerPost.patch('/:id', 
    param('id').isInt().withMessage('ID no válido, debe ser numerico'),
    body("mensaje").exists().withMessage("La propiedad mensaje debe ser enviada"),
    body("mensaje").notEmpty().withMessage("El mensaje no puede ir vacio"),
    handleInputErrors,
    verifyToken,
    updatePost
)


routerPost.delete('/:id', 
    param('id').isInt().withMessage('ID no válido, debe ser numerico'),
    handleInputErrors,
    verifyToken,
    deletePost
)

export default routerPost