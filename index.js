import express from 'express'
import mongoose from 'mongoose'
import { auth, getMe, login, uploadAvatar, updateStatus, uploadMusic } from './controllers/authController.js'
import { getUsers, getUser } from './controllers/usersController.js'
import { authValidation } from './validations/authValidation.js'
import multer from 'multer'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Mongoose Ok'))

const app = express()


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'static')
    },
      filename: (_, file, cb) => {
          cb(null, file.originalname)
      },
})
const upload = multer({ storage })



app.use(express.json())

app.get((req, res) => {
    res.send('fdfdfdfd')
})

app.use(express.static('static'))

app.put('/user', getUser)
app.get('/users', getUsers)
app.put('/status', updateStatus)
app.post('/upload', upload.single('image'), uploadAvatar)
app.post('/upload/music', upload.single('music'), uploadMusic)
app.post('/login', authValidation, login)
app.post('/auth', authValidation, auth)
app.put('/auth/me', getMe)





app.listen(process.env.PORT || 3001, () => {
    console.log('Server Ok')
})