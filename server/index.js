const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const userRoutes = require("./routes/User");
const {connectCloudinary} = require("./config/cloudinaryConnect");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const connectToDatabase = require("./config/database");
const cors = require("cors");
connectToDatabase();
connectCloudinary();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server Started Successfully at port : ${PORT}`);
});
app.use(cors({
	origin:"http://localhost:3000",
	credentials:true,
}))
app.use(fileUpload({
    useTempFiles:true,
	tempFileDir:"/tmp",
}))
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.get("/", (req, res) => {
	res.send("<b>Hello Mitron</b> <h1>Kaise Ho Sbhi</h1>")
});
