const Article = require("../../models/Article");

/**
 * @desc    Search articles
 * @route   GET /api/articles/search
 * @access  Public
 */
const search_articles = async (request, response) =>
{
    try
    {
        const { q } = request.query;

        if (!q)
            return response.status(400).json({ message: "Search query is required." });
        
        const search_regex = new RegExp(q, 'i');
        const articles = await Article.find(
            {
                $or: [
                    { title: { $regex: search_regex } },
                    { content: { $regex: search_regex } },
                    { tags: { $in: [search_regex] } }
                ]
            }
        ).populate("author", "username");

        if (!articles.length)
            return response.status(404).json({ message: "No articles found matching your query." });

        response.status(200).json(articles);
    }
    catch (error)
    {
        console.error(error);

        response.status(500).json({ message: "An error occurred while searching for articles." });
    }
};

module.exports = search_articles;
