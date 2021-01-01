const express = require('express');
const jwt = require('jsonwebtoken');

const jwtPrivateKey = "KDfdALfdsPFDd54dLQ";

const app = express();

app.use(express.json());

const allUsersData = [];

app.post("/register", (req, res) => {
    const userData = {};

    const errors = {};
    ['username', 'password', 'name', 'year-of-graduation', 'college'].forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined) {
            errors[key] = `${key} is required parameter`;
        }
        else if (req.body[key] === "") {
            errors[key] = `${key} can't be empty`;
        }
        else {
            userData[key] = req.body[key];
        }
    });

    if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
    }

    let usernameAlreadyTaken = false;
    allUsersData.forEach(alreadyExistingUser => {
        if (alreadyExistingUser.username === userData.username) usernameAlreadyTaken = true;
    });

    if (usernameAlreadyTaken) {
        res.status(400).json({ message: "username already taken!" });
        return;
    }

    allUsersData.push(userData);

    res.json({ message: "Successfully registered!" });
});

app.get("/profiles", (req, res) => {
    const usersDataCopy = JSON.parse(JSON.stringify(allUsersData));
    
    usersDataCopy.forEach(user => {
        delete usersDataCopy['password'];
    });

    res.json(usersDataCopy);
});

app.post("/login", (req, res) => {
    const userData = {};

    const errors = {};
    ['username', 'password'].forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined) {
            errors[key] = `${key} is required parameter`;
        }
        else if (req.body[key] === "") {
            errors[key] = `${key} can't be empty`;
        }
        else {
            userData[key] = req.body[key];
        }
    });

    if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
    }

    let isValid = false;
    let requestedUserIndexInGlobalArray = -1;
    for (let i = 0; i < allUsersData.length; i++) {
        const alreadyExistingUser = allUsersData[i];

        if (alreadyExistingUser.username === userData.username && alreadyExistingUser.password === userData.password) {
            isValid = true;
            requestedUserIndexInGlobalArray = i;
            break;
        }
    }

    if (!isValid) {
        res.status(400).json({ message: "username or password is incorrect!" });
        return;
    }

    const currentUserData = allUsersData[requestedUserIndexInGlobalArray];
    const dataToSign = {
        username: currentUserData.username
    };
    const token = jwt.sign(dataToSign, jwtPrivateKey, { expiresIn: 36000 });

    res.setHeader("auth-token", token);
    res.json({ message: "Successfully logged in!" });
});

app.put("/profile", (req, res) => {
    const userData = {};

    const errors = {};
    ['name', 'year-of-graduation', 'college'].forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined) {
            errors[key] = `${key} is required parameter`;
        }
        else if (req.body[key] === "") {
            errors[key] = `${key} can't be empty`;
        }
        else {
            userData[key] = req.body[key];
        }
    });

    if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
    }

    const authToken = req.headers['auth-token'];
    if (authToken === undefined || authToken === null) {
        res.status(401).json({ message: "'auth-token' is required to access this API!" });
        return;
    }

    // verify the JWT
    jwt.verify(authToken, jwtPrivateKey, (err, decodedInfo) => {
        if (err) {
            res.status(401).json({ message: "Invalid token or token expired!" });
            return;
        }
        const username = decodedInfo.username;

        // Check whether the mentioned username and password exists in our list of registered users
        let isValid = false;
        let requestedUserIndexInGlobalArray = -1;

        for (let i = 0; i < allUsersData.length; i++) {
            const alreadyExistingUser = allUsersData[i];

            if (alreadyExistingUser.username === username) {
                isValid = true;
                requestedUserIndexInGlobalArray = i;
                break;
            }
        }

        // update the user's details corresponding to the found user
        allUsersData[requestedUserIndexInGlobalArray] = { ...allUsersData[requestedUserIndexInGlobalArray], ...userData };
        
        res.json({ message: "Successfully updated!" });
    
    });
});

app.listen(7050, () => console.log("Listening on port 7050..."));