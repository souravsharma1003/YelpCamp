const app=require("./app");
require("dotenv").config();
const connectToDb=require("./config/db");

const PORT=process.env.PORT;

const startServer=async()=>{
    await connectToDb();
    app.listen(PORT,()=>{
        console.log(`Server started at http://localhost:${PORT}`);
    })
}

startServer();