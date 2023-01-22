import jwt from 'jsonwebtoken'
import AuthUser from '../models/authModel.js'

export const getUsers = async (req, res) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const {id, ...doc } = jwt.verify(token, 'Secret')
        const users = await AuthUser.find( { _id: { $nin: [id] } } )
        users.forEach(element =>  delete element.passwordHash );
        res.json(users)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}
export const getUser = async (req, res) => {
    try {
        const userId = req.body.id
        const user = await AuthUser.findById(userId)
        res.json(user)
    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}