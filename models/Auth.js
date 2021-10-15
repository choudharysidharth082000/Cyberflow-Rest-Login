const mongoose = require('mongoose');

const {Schema} = mongoose;

const users = new Schema(
    {
        firstName: {
            required: true,
            type: String,
            min:3
        },
        lastName: {
            required: true,
            type: String,
            min:3

        },
        email: 
        {
            required: true,
            type: String,
            min: 8
        },
        photo:{

            required:true,
            type:String

        },
        ip:{
            required:true,
            type:String
        },
        isActive: 
        {
            type: Boolean,
            default: true
        }
       
       

    },{timestamps: true}
)

const user = mongoose.model("User", users);

exports.user = user;



// const AdminSessionSchema = new Schema({
//     token : {
//         type : String,
//         minLength : 256,
    
//         required : true
//     },
//     userID : {
//         type: Schema.Types.ObjectId,
//         ref: 'Teacher' 
//     },
//     lastAccessedAt : {
//         type : Date,
//         default : new Date()
//     },
//     isActive : {
//         type : Boolean,
//         default : true
//     },
//     tokenCreationDetails : {
//         ip : {
//             type : String,
//             default : ''
//         },
//         useragent : {
//             type : String,
//             default : ''
//         },
//         os : {
//             type : String,
//             default : ''
//         }
//     },
//     sessionLogs : [
//         {
//             type : String
//         }
//     ]
// }, {timestamps : true});
// const AdminSessionModel = mongoose.model("admin-session", AdminSessionSchema);
// exports.AdminSessionModel = AdminSessionModel;
