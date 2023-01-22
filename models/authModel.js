import mongoose from "mongoose";


const AuthUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatar: {
        
    },
    status: {
        type: String
    },
    photos: [],
    music: {
        
    }
})

export default mongoose.model('auth', AuthUser)