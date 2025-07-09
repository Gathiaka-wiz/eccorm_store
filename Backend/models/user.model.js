import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
        type:String, 
        required:[true, 'Username is required'], 
        trim:true, 
        minLength:6, 
        maxLength:50  
    },
    email: { 
        type: String, 
        required:[true, 'Email is required'], 
        unique: true,
        trim:true,
        validate: {
            validator: function(v) {
                // Simple email regex for validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password:{ 
        type:String, 
        required:[true, 'Password is required'] 
    },
    role:{ 
        type:String, 
        enum:['user','admin'], 
        default:'user' 
    },
    isVerified:{ 
        type:Boolean, 
        default:false 
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'product'
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    }],
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt:Date
},{ timestamps:true });

export default mongoose.model('User', userSchema);