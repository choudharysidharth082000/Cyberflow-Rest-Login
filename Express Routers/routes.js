const homeRoute = require('./homeRoute');
const express= require('express');
const {user} = require('../models/Auth');
const AdminValidator = require('../Validators/adminValidator');

const generateJWT = require('../utils/generateJWT');
const verifyPass = require('../utils/verifyPassword');
const hashPassword = require('../utils/passwordHash');
const decryptJWT = require('../utils/decryptJWT');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// const swaggerDocument = require('./swagger.json');

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));






const router = express.Router();




router.post('/login', async (req, res)=>
{
    
      

     

      const first=req.body.it.HU;
      const last=req.body.it.YS;
      const email=req.body.it.Tt;
      const photo=req.body.it.kK ;
      const ip= req.socket.remoteAddress;
      

      var newuser=new user({ firstName:first,lastName:last,email:email,photo:photo,ip:ip });

      newuser.save((err,data)=>{
        if(err)
        {
          console.log(err);
          res.send(err);

        }

        else{
          console.log(data);
          res.send(data);
        }

      })

     

      // console.log(first+" "+last+" "+email+" "+photo);
      res.send(req.body);

    
})


                                              //* NO NEED OF SIGNUP */    

// router.post('/signup', async (req, res)=>
// {
    

//        const {body} = req;
        
//         const resultFromJoi =  AdminValidator('firstName lastName email password mobileNumber title', body);
       
//         if(!resultFromJoi)
//         {
//             res.send('You have entered Wrong Credentials');
//         }


//         const {generateSalt, generateHash} =await hashPassword(body.password);
        
        

//         if(!generateHash)
//         {
//             res.send('Internal Password Error in hashing');
//         }

//         body.password = generateHash;

//         body.salt = generateSalt;

//         const newJWT = generateJWT(body);
        

//         try{
//             const adminEmail = await Admin.findOne({email : body.email});
            

            

//             if(adminEmail)
//             {
//                 res.send('User already Exists');
//             }

//         }
//         catch(err)
//         {
//             throw new Error(`${err}`);
//         }


//         try 
//         {
//             const admin = await  new Admin(body);
            

//             if(!admin)
//             {
//                 res.send(`Something went Wrong`);
//             }

//                 admin.save();

//             res.json({
//                    status: true,
//                    message: "Signup Successfull",
//                    user: admin,
//                    accessToken: newJWT
//                })

            
//         }
//         catch(err)
//         {
//             throw new Error(`${err}`)
//         }

        

// })


router.post('/logout',context, async (req,res)=>
{
    console.log(res.isLoggedIN);
    if(!res.isLoggedIN) {
        throw new Error('User Not Logged In');
    }
    let {_id} = res.user._id;
    console.log(_id);
    const {accessToken} =req.body;
    


    
    try{
        const user = await AdminSessionModel.findOne({userID: _id });

        if(!user)

        {
                    try 
            {
                const newuser = await new AdminSessionModel({userID: _id,token:accessToken, lastAccessedAt: new Date(), isActive: false,sessionLogs: `User Logged Out at ${new Date()}`});
                try{

                    const saving = await newuser.save();

                }
                catch(err)
                {
                    console.log(err);
                }

            
            }
            catch(err)
            {
                console.log(err);
            }


         }


         await AdminSessionModel.findOneAndUpdate({userID : _id},{$set:{isActive : false, lastAccessedAt : new Date() },
        $push: {sessionLogs: `User Logged Out at ${new Date()}` } });


        return {
            status: true,
            message: "Logout Successful"
        }



    }
    catch(err)
    {
        console.log(err);
    }



})
// --------------------------------------------Global Middleware--------------------------------


async function context(req, res , next) {
            
    console.log(req.connection.remoteAddress);

    const token = req.headers.authorization || '';
    // console.log(token);
        
    
    
    

    const user =await decryptJWT(token); 
    console.log(user);
    
  

    const isLoggedIN = user? true : false;
    

    res.isLoggedIN = isLoggedIN;
    res.user = user;

    next();

       

    
}



const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CyberFlow Rest Login",
        version: "1.0.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "CBF",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Sidharth Choudhary",
          url: "https://time-plot.netlify.app",
          email: "choudharysidharth082000@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./Express Routers/routes.js"],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
 console.log(swaggerDocs);
 
/**
 * @openapi
 * /login:
 *   post:
 *      summary: Login User
 *      description: Login The existing User to the App
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string 
 *                              description: Email for the existing user 
 *                              required: true
 *                          password:
 *                              type: string 
 *                              description: Password for the user 
 *                              required: true
 *      responses:
 *          200:
 *              description: Status Good                
 * 
 *    
 */

/**
 * @openapi
 * /signup:
 *   post:
 *      summary: Signup User
 *      description: Signup The existing User to the App
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string 
 *                              description: Email for the existing user 
 *                              required: true
 *                          password:
 *                              type: string 
 *                              description: Password for the user 
 *                              required: true
 *                          firstName:
 *                              type: string 
 *                              description: First Name for the user 
 *                              required: true
 *                          lastName:
 *                              type: string 
 *                              description: LastName  for the user 
 *                              required: true
 *                          mobileNumber:
 *                              type: number 
 *                              description: Phone for the user 
 *                              required: true
 *                          title:
 *                              type: string 
 *                              description: Title for the user 
 *                              required: true
 *      responses:
 *          200:
 *              description: Status Good                
 * 
 *    
 */

 

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;