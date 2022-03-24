const service = require("./user.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// bcrypt declaration and dependecies
const bcrypt = require("bcrypt");
const saltRounds = 10;

const invalidCharacters = [',', '"', ":", ";", "{", "}", "[", "]", "(", ")", "|", '/',`\n`, '+', '=', "?", '>', "<", '~', "`"];

async function userExists(req, res, next){
    const foundUser = await service.read(req.params.username);
    if(foundUser){
        res.locals.user = foundUser;
        return next();
    }

    next({
        status: 404,
        message: `User not found with username: ${req.params.username}`
    })
}

async function checkForExistingUser(req, res, next){
    const foundUser = await service.read(req.body.data.username);
    if(foundUser){
        return next({
            status: 404,
            message: `Username is taken.`
        });
    }
    next()
}

function bodyDataHas(propertyName){
    return function(req, res, next){
        const {data = {}} = req.body;
        if(data[propertyName]){
            return next();
        }
        next({
            status: 400,
            message: `New user must include a ${propertyName}.`
        });
    }
}

async function usernameIsValid(req, res, next){
    const username = req.body.data.username;
    const usernameChars = username.split("");
    for(const index in usernameChars){
        const currentChar = usernameChars[index];
        if(invalidCharacters.includes(currentChar) || username === "create"){
            return next({
                status: 400,
                message: `Invalid characters not allowed in username.`
            });
        }
    }
    next();
}

async function hashPassword(req, res, next){
    bcrypt.hash(req.body.data.password, saltRounds, (err, hash) => {
        res.locals.hashed_password = hash;
        next();
    })
}

async function comparePassword(req, res, next){
    bcrypt.compare(suppliedPassword, )
}

async function create(req, res, next){
    const {data: {username, email, image_url} = {}} = req.body;
    const newUser = {
        username,
        email,
        image_url,
        password_hash: res.locals.hashed_password,
    };
    await service.create(newUser)
    res.status(201).json({data: newUser})
}

async function read(req, res, next){
    res.json({data: res.locals.user});
}

async function update(req, res, next){
    const {data: {username, email, image_url} ={}} = req.body;
    const updatedUser = {   
    }
}
module.exports = {
    create: [
        asyncErrorBoundary(checkForExistingUser),
        asyncErrorBoundary(bodyDataHas("username")),
        asyncErrorBoundary(bodyDataHas("email")),
        asyncErrorBoundary(bodyDataHas("password")),
        asyncErrorBoundary(usernameIsValid),
        asyncErrorBoundary(hashPassword),
        asyncErrorBoundary(create),
    ],

    read: [
        asyncErrorBoundary(userExists),
        asyncErrorBoundary(read),
       
    ],

    update: [
        asyncErrorBoundary(userExists),
        asyncErrorBoundary(bodyDataHas("username")),
        asyncErrorBoundary(bodyDataHas("email")),
        asyncErrorBoundary(bodyDataHas("bio")),
        asyncErrorBoundary(bodyDataHas("image_url")),
        asyncErrorBoundary(update)
    ]
}


