import express from 'express';
import {client} from  "@repo/db/client"


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.post("/signup",async(req,res)=>{
    const {username, password} = req.body;
    if (!username || !password ){
      res.send({
        message: "username or password is missing"
      });
    }
    if(await client.user.findFirst({
      where:{
        username: username,
      }
    })){
      return res.status(404).json({
        error: "user already exist"
      })
    }
    await client.user.create({
      data:{
        username:username,
        password: password
      }
    });
    res.status(200).json({
      message: 'account crested'
    });
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





