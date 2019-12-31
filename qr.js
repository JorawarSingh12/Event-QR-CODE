var express=require("express");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/qr",{useNewURLParser:true});
var app=express();

var UserSchema=new mongoose.Schema({
    username: String,
    Password: String,
    email: String,
});
var user =mongoose.model("user",UserSchema);

app.set("view engine","ejs");
app.use(express.static("public"));
app.get('/',function(req,res){
    res.render("qr");
});
app.get('/generate',function(req,res){
    var email=req.query.email;
    var username=req.query.username;
    var password=req.query.password;
    console.log(username);
    if(typeof(username)==="undefined")
    res.send("Go to home page");
    else{
        user.create({
            username: username,
            Password:password,
            email: email
    
        },function(err,user){
            if(err){
                console.log(err);
            }
            else{
                console.log(user);
            }
        });
        
        res.render("generate",{email:email,username:username});
    }
   
});
app.get('/check/:email',function(req,res){
    console.log(req.query);
    user.find({email:req.params.email},function(err,user){
        if(err)
        res.send("Fail");
        else
        res.send("Pass");
    });
//    res.render("check"); 
//    else
//    res.send("Not Accessable User");

});
app.listen(3000,function(){
    console.log("Server has started.");
})