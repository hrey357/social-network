import { Router } from 'express'
import { param } from 'express-validator'
import { toggleLike,  getLikes, getLikesByUser } from '../handlers/like.handler'
import { handleInputErrors } from '../middleware'
import { verifyToken } from '../handlers/jwt.handler'

const routerLikes = Router()

routerLikes.get('/', verifyToken, getLikes)

routerLikes.post('/:id', 
    param('id').isInt().withMessage('ID no válido, debe ser numerico'),
    handleInputErrors,
    verifyToken,
    toggleLike
)

routerLikes.get('/user', 
    verifyToken,
    getLikesByUser
)

export default routerLikes