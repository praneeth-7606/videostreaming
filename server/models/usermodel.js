// import mongoose from "mongoose"

// const userSchema  =new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:[true,"Name is important"]
//     },
//     email:{
//         type:String,
//         required:true,
//         unquie:[true,"Email is important"]
//     },
//     question:{
//         type:String,
//         required:[true,"Question  is important"]
//     },
//     password:{
//         type:String,
//         required:[true,"password is important"],
//         minlength:[6,"password length should be 6 characters long"]
//     },
//     role: {
//         type: Number,
//         default: 0,
//       },
    
    
   

// },{timestamps:true})
// export default  mongoose.model("users",userSchema)
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Check if the model already exists before defining it
const User = models.users || model('users', userSchema);

export default User;
