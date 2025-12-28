/**
 * { timestamps: true }: This automatically adds two fields to every document:
 *       {
 *          "createdAt": "2025-01-01T10:00:00Z",
 *          "updatedAt": "2025-01-01T10:05:00Z"
 *       }
 */

import mongoose from "mongoose";

/**
 *  -> Including a library that adds schema enforcement, models..
 *  -> Schemas acts as a guard before data reaches MongoDB
 *  we are defining: An application database schema (fields, type of each field, initial value ..ect)
 */

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePicture: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
)

/**
 * @param "User" name of the model to create, better to be UpperCase + singular.
 * @param "userSchema" name of schema
 * 
 * 
 *  A model is an object returned by mongoose.model("User", userSchema)
 *  it contains the schema + built in methods to manipulate the data the lives inside the mongoDB collection(MongoDB collection group of related documents stored inside a database)
 *  A model is just a gateway to database, it does not contain the data, data lifes in mongodb.
 * 
            MongoDB Server
            │
            └── Database
                │
                ├── users (collection)                                          ------------------> this is a MongoDB collection
                │     ├── { _id: 1, email: "a@mail.com", password: "..." }      ------------------> this is a document
                │     ├── { _id: 2, email: "b@mail.com", password: "..." }
                │     └── { _id: 3, email: "c@mail.com", password: "..." }
                │
                └── messages (collection)
                      ├── { _id: 1, from: "A", to: "B", content: "Hi" }
                      └── { _id: 2, from: "B", to: "A", content: "Hello" }

 *  What is a query?
 *      -> A request you send to the database to find, create, update, or delete data.
 */

const User = mongoose.model("User", userSchema)

export default User;