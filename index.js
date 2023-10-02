const express = require("express");
const cors = require('cors');
const DBConnect = require('./config/connect');
const userRoutes = require("./routes/Users");


const app = express();
app.use(cors());
app.use(express.json());
DBConnect();

app.use("/api/v1/users", userRoutes);



app.listen(3001, () => {
    console.log(`Server is running on port http://localhost:3001/`);
})
