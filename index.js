// const express = require('express');
// let mongoose = require('mongoose');
// const multer=require('multer');
// const cors=require('cors')
// const bodyParser = require('body-parser');



// let db = async() => {
//     try{ 
//     // await mongoose.connect('mongodb+srv://ruyyadisathwikreddy:6rDUUYNILeyCIr45@cluster0.mwcsryu.mongodb.net/NYAAYSAHAYAK');
//     await mongoose.connect('mongodb+srv://ruyyadisathwikreddy:6rDUUYNILeyCIr45@cluster0.mwcsryu.mongodb.net/NYAAYSAHAYAK?retryWrites=true&w=majority');
//     console.log('mongo db connected!');
//     }
//     catch(error) {
//         console.log(error);
//     }
// }
// db();

// app.get('/',(req,res) => {  
//     console.log(" A new request has been raised on  " + new Date(Date.now())); 
//     res.writeHead(200,{ 'Content-Type':"text/plain"})  
//     res.write(' hey');
//     res.end();
// });


// const userSchema = new mongoose.Schema({ 
//     username: { 
//         type: String, 
//         require: true
//     }, 
//     password: {
//         type: String,
//         require:true
//     }
// }) 
  
// const Users = new mongoose.model("User", userSchema)

// app.get('/users',async (request,response) => { 
//     const allUsers = await Users.find({});
//     try {
//       response.send(allUsers);
//     } catch (error) {
//       response.status(500).send(error);
//     }
// });






// const Q_As = new mongoose.Schema({question:String,answer:[String]});
// const constSchema = new mongoose.Schema({
//     constitutional_related_faqs:[Q_As],
// });

// const Constitution = new mongoose.model("constitution", constSchema)

// app.get('/laws',async (request,response) => { 
//     const allconst = await Constitution.find({});
//     try {
//       response.send(allconst[0]);   
//     } catch (error) {       
//       response.status(500).send(error);
//     }
// });





// // const Q_Ans = new mongoose.Schema({question:String,answer:[String]});
// // const userSchema002 = new mongoose.Schema({
// //     FundamentalRights:[Q_Ans],
// // });

// // const FaqData = new mongoose.model("constitution", userSchema002)
// // const database =mongoose.connection;
// // app.get('/constitution',async (request,response) => { 
// //     try {
    
// //     const constitutionaldata = database.collection('constitutions')
// //     const constitution = await constitutionaldata.find({}).toArray();
// //       response.send(constitution);
// //     } catch (error) {
// //       response.status(500).send(error);
// //     }
// // });




// //To check the user
// app.post("/login", getFields.none(), async (request, response) => {
//     console.log(request.body);
//     let user=await Users.findOne({username:request.body.username,password:request.body.password})
   
//     try {
//         if(user)
//             response.send(user);
//         else
//             response.send('Authentication Failed')
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

// app.post('/login', async (request, response) => {
//   const { email, password } = request.body;

//   try {
    
//     const user = await Users.findOne({ email });
    
//     if (user) {
     

//       if (password === user.password) {
//         response.json({ success: true, message: 'Login successful', userId:user.email });
//       } else {
//         response.status(401).json({ success: false, message: 'Invalid ' });
//       }
//     } else {
//       response.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     response.status(500).send(error.message);
//   }
// });



// app.listen(5000, () => console.log("listening at port 5000"));


let express = require('express');
let mongoose = require('mongoose');
const multer=require('multer');
const cors=require('cors');
const bcrypt = require('bcrypt');

let getFields=multer();

let app = express();
app.use(cors());
app.use(express.json());

let db = async() => {
    try{ 
    await mongoose.connect('mongodb+srv://ruyyadisathwikreddy:6rDUUYNILeyCIr45@cluster0.mwcsryu.mongodb.net/NYAAYSAHAYAK');
    
    console.log('mongo db connected!');
    }
    catch(error) {
        console.log(error);
    }
}
db();

app.get('/',(req,res) => {  
    console.log(" A new request has been raised on  " + new Date(Date.now())); 
    res.writeHead(200,{ 'Content-Type':"text/plain"})  
    res.write(' hey');
    res.end();
});





const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name:{
        type:String,
        required: true,
    }
  });
  
  const Users = new mongoose.model('User', userSchema);
  


app.post('/login', async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await Users.findOne({ email });

    if (user) {
      // Use bcrypt to compare passwords securely
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        response.json({ success: true, message: 'Login successful', userId: user.email });
      } else {
        response.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      response.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
});


  

  app.post('/signup',async(request, response)=>{
    const { email, password,name } = request.body;
    try{
        const user = await Users.findOne({ email });
        if(user){
            response.status(401).json({ success: false, message: 'Email is already in use.' });
        }else{
            const user=new Users({email,password,name});
            await user.save();
            response.send({ success: true, message: 'Login successful' });
        }
    }catch (error) {
        response.status(500).send(error.message);
      }
  });





app.post('/register',async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"piz fill"})
    }
    try{
        const users =new Users({email,password});
        await users.save();
        res.send(users);
        res.status(201).json({message:"all din"})
    }catch(err){
        console.log(err);
    }
});


const Q_As = new mongoose.Schema({question:String,answer:[String]});
const constSchema = new mongoose.Schema({
    constitutional_related_faqs:[Q_As],
});

const Laws = new mongoose.model("law", constSchema)

app.get('/laws',async (request,response) => { 
    const allconst = await Laws.find({});
    try {
      response.send(allconst[0]);   
    } catch (error) {       
      response.status(500).send(error);
    }
});



// Know Your Rights
const Data = new mongoose.Schema({question:String,answer:[String]});
const KnowYourRightsSchema = new mongoose.Schema({
  legal_rights_in_india:[Data],
});

const KnowYourRights2 = new mongoose.model("knowyourrights", KnowYourRightsSchema)

app.get('/rights',async (request,response) => { 
    const allconst = await KnowYourRights2.find({});
    try {
      response.send(allconst[0]);   
    } catch (error) {       
      response.status(500).send(error);
    }
});




//To check the user
app.post("/login", getFields.none(), async (request, response) => {
    console.log(request.body);
    let user=await Users.findOne({username:request.body.username,password:request.body.password})
   
    try {
        if(user)
            response.send(user);
        else
            response.send('Authentication Failed')
    } catch (error) {
        response.status(500).send(error);
    }
});






app.listen(5000, () => console.log("listening at port 5000"));