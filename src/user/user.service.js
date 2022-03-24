const knex = require("../db/connection");

async function create(user){
    return knex("users")
    .insert(user)
}

async function read(username){
    return knex("users as u")
        .select( "u.username","u.bio", "u.image_url", "u.created_at", "u.updated_at")
        .where({"username": username}).first();
}



module.exports = {
    read,
    create,
}
