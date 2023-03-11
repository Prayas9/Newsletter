const express = require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");

app.listen("3000",function(req,res){
   console.log("Server has started");
});

app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  console.log(firstName,lastName,email);

  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
           FNAME:firstName,
           LNAME:lastName,
        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);
  console.log(jsonData);

  const url="https://us11.admin.mailchimp.com/lists/2d9a1b568b";

  const options={
    method:"POST",
    auth:"Prayas:3d6c2525b0091fa06209a840728bacd6-us11"
  };

  const hello = https.request(url,options,function(response){
     response.on("data",function(data){
        console.log("data sent");
       res.send(JSON.parse(data));
     })
  });

  hello.write(jsonData);
  hello.end();
});

//API key
//3d6c2525b0091fa06209a840728bacd6-us11

//list ID
//2d9a1b568b