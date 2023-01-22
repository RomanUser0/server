import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import AuthUser from '../models/authModel.js'
import jwt from 'jsonwebtoken'



export const auth = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10)

    const auth = new AuthUser({
      name: req.body.name,
      email: req.body.email,
      passwordHash: passwordHash
    })
    const authSave = await auth.save()

    const token = jwt.sign({
      id: authSave._id
    }, 'Secret', { expiresIn: '1d' })

    res.json({
      ...authSave._doc,
      token
    })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
export const login = async (req, res) => {
  try {
    const user = await AuthUser.findOne({ email: req.body.email })
    if (!user) {
      return res.status(403).json({
        message: 'Не удалось авторизоваться'
      })
    }
    const password = await bcrypt.compare(req.body.password, user._doc.passwordHash)
    if (!password) {
      return res.status(404).json({
        message: 'Не правильный логин или пароль'
      })
    }
    const token = jwt.sign({
      id: user._id
    }, 'Secret', { expiresIn: '1d' })
    res.json({
      ...user._doc,
      token
    })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
export const getMe = async (req, res) => {
  try {
    const user = await AuthUser.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const user = await AuthUser.findById(req.body.id)
    user.avatar = `${req.file.originalname}`
    user.photos.push(`${req.file.originalname}`)
    await user.save()
    res.json({
      ...user._doc
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const uploadMusic = async (req, res) => {
  try {
    const user = await AuthUser.findById(req.body.id)
    user.music = `${req.file.originalname}`
    await user.save()
    res.json({
      ...user._doc
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}

export const updateStatus = async (req, res) => {
  try {
    const user = await AuthUser.findById(req.body.id)
    user.status = req.body.text
    await user.save()
    res.json({
      ...user._doc
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа',
    });
  }
}




