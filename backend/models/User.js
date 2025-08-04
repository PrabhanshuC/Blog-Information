const { model, Schema } = require("mongoose");

const User_Schema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true
        },
        role:
        {
            type: String,
            enum: ["user", "admin"],
            required: true,
            default: "user"
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        name:
        {
            type: String
        },
        about:
        {
            type: String
        },
        github:
        {
            type: String
        },
        website:
        {
            type: String
        }
    }
);

module.exports = model(User_Schema);
