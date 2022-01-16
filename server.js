const express=require("express");
const app = express();
const connectDB=require("./config/db");

const PORT= process.env.PORT || 5000;
connectDB();

//body-parser
app.use(express.json({extended:false}));

app.get("/", function(req,res){
    res.json({msg:"hello"});
});

//Routes
app.use("/api/users",require("./routes/users"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/contacts",require("./routes/contacts"));


app.listen(PORT,function(){
    console.log("Server listening on port "+PORT);
})