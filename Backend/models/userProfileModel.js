import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
      },
      profileImage:{
        type:String,
       default: '/assets/images/SampleProfileImage'
      },
      username:{
        type:String,
        require:true
      },
      language:{
        type:String,
        require:true
      },

    Progres:{
        type:Number,
        require:true
    },
    achievements: [
        {
          title: String,
          description: String,
          date: { type: Date, default: Date.now },
        },
      ],
    }, 
    { timestamps: true });


const userProfileModel = mongoose.model('userProfileModel', userSchema); 
export default userProfileModel;