const Article = require("../models/Article");
const User = require("../models/User");

/**
 * @desc    Perform a global search across articles and users
 * @route   GET /api/search
 * @access  Public
 */
const global_search = async (request, response) =>
{
    try
    {
        const { q, author_username, tags, start_date, end_date } = request.query;
        const article_query_conditions = {};
        const user_query_conditions = {};
        let search_regex = null;

        if (q) {
            search_regex = new RegExp(q, 'i');
            // Apply to article title/content/tags
            article_query_conditions.$or = [
                { title: { $regex: search_regex } },
                { content: { $regex: search_regex } },
                { tags: { $in: [search_regex] } }
            ];
            // Apply to user username/email/about
            user_query_conditions.$or = [
                { username: { $regex: search_regex } },
                { email: { $regex: search_regex } },
                { about: { $regex: search_regex } }
            ];
        }

        // Filter by Author Username (only for articles)
        if (author_username)
        {
            const author_regex = new RegExp(author_username, 'i');
            const author_users = await User.find({ username: { $regex: author_regex } }).select('_id');
            
            if (author_users.length > 0) {
                article_query_conditions.author = { $in: author_users.map(u => u._id) };
            } else {
                // If specific author not found, no articles will match this filter.
                // Return empty results for articles, but still search users if 'q' is present.
                return response.status(200).json({ articles: [], users: [] }); 
            }
        }

        // Filter by Tags (only for articles)
        if (tags)
        {
            const tags_regex_array = tags.split(',').map(tag => new RegExp(tag.trim(), 'i'));
            article_query_conditions.tags = { $in: tags_regex_array };
        }

        // Filter by Date Range (only for articles)
        if (start_date || end_date)
        {
            article_query_conditions.createdAt = {};
            if (start_date) {
                article_query_conditions.createdAt.$gte = new Date(start_date);
            }
            if (end_date) {
                article_query_conditions.createdAt.$lte = new Date(end_date);
            }
        }

        const search_results = {
            articles: [],
            users: []
        };

        // Perform Article Search
        const found_articles = await Article.find(article_query_conditions).populate("author", "username");
        search_results.articles = found_articles;

        // Perform User Search (only if a general query 'q' is provided, or if no specific author filter was applied)
        // If author_username filter was used, we only searched articles by author, not general users.
        if (q && Object.keys(user_query_conditions).length > 0) {
            const found_users = await User.find(user_query_conditions).select('username email about github website');
            search_results.users = found_users;
        }

        // Check if any results were found in either category
        if (search_results.articles.length === 0 && search_results.users.length === 0) {
            return response.status(200).json({ message: "No results found matching your query.", articles: [], users: [] });
        }

        response.status(200).json(search_results);

    }
    catch (error)
    {
        console.error("Global search error:", error); // Log the specific error for debugging
        response.status(500).json({ message: "An internal server error occurred during search." });
    }
};

module.exports = global_search;
