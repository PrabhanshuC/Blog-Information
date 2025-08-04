const { model, Schema } = require("mongoose");

const Article_Schema = new Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        content:
        {
            type: String,
            required: true
        },
        author:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        tags:
        {
            type: [String],
            required: true
        },
        likes:
        {
            type: Number,
            default: 0
        }
    }
);

module.exports = model(Article_Schema);
