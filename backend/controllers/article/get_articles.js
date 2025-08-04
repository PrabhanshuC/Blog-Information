const Article = require("../../models/Article");

const get_articles = async (request, response) =>
{
    try
    {
        const articles = await Article.find().populate('author', 'username');

        response.json(articles);
    }
    catch(err)
    {
        console.error(err.message);
        response.json({ message: "Internal server error" });
    }
};

module.exports = get_articles;
