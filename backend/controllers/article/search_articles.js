const Article = require("../../models/Article");
const User = require("../../models/User");

/**
 * @desc    Search articles with filters
 * @route   GET /api/articles/search
 * @access  Public
 */
const search_articles = async (request, response) =>
{
    try
    {
        const { q, author_username, tags, start_date, end_date } = request.query;
        const query_conditions = {};

        // 1. Text Search (if 'q' is provided) - Already uses RegExp for substring and case-insensitivity
        if (q)
        {
            const search_regex = new RegExp(q, 'i');
            query_conditions.$or = [
                { title: { $regex: search_regex } },
                { content: { $regex: search_regex } },
            ];
        }

        // 2. Filter by Author Username (if 'author_username' is provided)
        if (author_username)
        {
            const author_regex = new RegExp(author_username, 'i');
            const author_users = await User.find({ username: { $regex: author_regex } }).select('_id');
            
            if (author_users.length > 0)
                query_conditions.author = { $in: author_users.map(u => u._id) };
            else
                return response.status(200).json([]);
        }

        // 3. Filter by Tags (if 'tags' are provided - comma-separated)
        if (tags)
        {
            const tags_regex_array = tags.split(',').map(tag => new RegExp(tag.trim(), 'i'));
            query_conditions.tags = { $in: tags_regex_array }; // $in with regex works for array fields
        }

        // 4. Filter by Date Range (if 'start_date' or 'end_date' are provided)
        if (start_date || end_date)
        {
            query_conditions.createdAt = {};
            if (start_date) {
                query_conditions.createdAt.$gte = new Date(start_date);
            }
            if (end_date) {
                query_conditions.createdAt.$lte = new Date(end_date);
            }
        }

        if (Object.keys(query_conditions).length === 0)
        {
            const all_articles = await Article.find().populate("author", "username");
            return response.status(200).json(all_articles);
        }

        const articles = await Article.find(query_conditions).populate("author", "username");

        if (!articles.length)
            return response.status(200).json([]);

        response.status(200).json(articles);
    }
    catch (error)
    {
        console.error(error);
        response.status(500).json({ message: "An error occurred while searching for articles." });
    }
};

module.exports = search_articles;
