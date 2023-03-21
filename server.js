const dotenv = require("dotenv");
const { verifyToken, generateToken } = require("./middleware/auth");

const app = require('./app');


/* SERVER CONFIGURATIONS */
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log("Server Running on PORT",PORT));

/* ROUTES */
app.post("/generateToken", generateToken);
// Our Schedule and User APIs are authenticated now before reaching the controller
app.use("/api",verifyToken,require('./routes'));

/* This is a custom route for all the invalid routes */
app.use('*', function (req, res) {
    return res.status(400).json({message: 'invalid route', data: {}});
})


module.exports = app;