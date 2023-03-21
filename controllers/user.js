const bcrypt = require("bcrypt");
const { createUserDB, getUserbyEmailDB, getUsersListDB } = require("./dbController");


/* REGISTER USER */
/* API to create a new user if it does not exist */
const registerUser = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log("registerUser requestBody", requestBody);
        const { name, email, password } = requestBody;

        const salt = await bcrypt.genSalt(); // Create a random SALT (Encryption)
        const passwordHash = await bcrypt.hash(password, salt);        
        
        // Checking if the user is present or not.
        const isUser = await getUserbyEmailDB(email);
        if(isUser) throw "User already exists"; // If the user is present, don't add it again.

        // If user is new, adding it to the database.
        const savedUser = await createUserDB(name,email,passwordHash);
        savedUser.password = undefined;
        console.log("savedUser Data", savedUser);
        res.status(201).json({message:"created user successfully",data:savedUser});
    } catch (error) {
        if (error.message) error = error.message;
        console.log("registerUser Error", error);
        res.status(500).json({ message:error || "failed to create user", data:{}});
    }
};

/* GET USERS */
/* API to get the list of all users */
const getUsers = async (req, res) => {
    try {
        console.log("getUsers called");
        const usersList = await getUsersListDB();
        if (!usersList || !usersList.length) throw "no usersList found";
        return res.status(200).json({message: "data fetched successfully", data:usersList});
    } catch (error) {
        if (error.message) error = error.message;
        console.log("getUsers error", error);
        return res.status(500).json({message : error || "failed to fetch data", data: []});
    }
}

module.exports = {
    registerUser,
    getUsers
}