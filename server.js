const express=require("express");
const app = express();
const connectDB=require("./config/db");
const cors=require("cors");
const path=require("path");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

const PORT= process.env.PORT || 5000;
connectDB();

//body-parser
app.use(express.json({extended:false}));


//Routes
app.use("/api/users",require("./routes/users"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/contacts",require("./routes/contacts"));

if(process.env.NODE_ENV !== 'production') {
    app.use(express.static("client/build"));
    app.get("*", (req,res)=> res.sendFile(path.resolve(__dirname,"client","build", "index.html")));
}

app.listen(PORT,function(){
    console.log("Server listening on port "+PORT);
})
