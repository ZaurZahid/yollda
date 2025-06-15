export const fetchFromAPI = async (endpoint, language = 'en') => {
    const BASE_URL = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL; // Use environment variable for base URL
    const url = `${BASE_URL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        'Accept-Language': language, // Send language in the headers
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
    }
};
