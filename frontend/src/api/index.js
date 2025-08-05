const api_url = import.meta.env.VITE_API_URL;

export const api_request = async (endpoint, method = "GET", body = null, token = null) => {
    const headers = { "Content-Type": "application/json" };

    if (token)
        headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };

    if (body)
        options.body = JSON.stringify(body);

    const response = await fetch(`${api_url}${endpoint}`, options);

    const text = await response.text();

    let data;
    try
    {
        data = text ? JSON.parse(text) : {};
    }
    catch (error)
    {
        console.log(error);
        throw new Error(`Invalid JSON response: ${text}`);
    }

    if (!response.ok)
        throw new Error(data.message || "An error occurred");

    return data;
};
