import express from 'express'
import mongoose from 'mongoose'
import { auth, getMe, login, uploadAvatar, updateStatus, uploadMusic } from './controllers/authController.js'
import { getUsers, getUser } from './controllers/usersController.js'
import { authValidation } from './validations/authValidation.js'
import multer from 'multer'
import config from 'config'
import cors from 'cors'


const PORT = process.env.PORT || config.get('serverPort')

mongoose.connect('mongodb+srv://Roman:20roman20@cluster0.aev28q2.mongodb.net/auth?retryWrites=true&w=majority')
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
app.use(cors({
    origin: [
       'http://localhost:3000'
    ],
    credentials: true,
 }));
 app.use((req, res) => {
     res.send('fdfdfdfd')
 })

app.use(express.static('static'))

app.put('/user', getUser)
app.get('/users', getUsers)
app.put('/status', updateStatus)
app.post('/static', upload.single('image'), uploadAvatar)
app.post('/static/music', upload.single('music'), uploadMusic)
app.post('/login', authValidation, login)
app.post('/auth', authValidation, auth)
app.put('/auth/me', getMe)





app.listen(process.env.PORT || PORT, () => {
    console.log('Server Ok', PORT)
})
