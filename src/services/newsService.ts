import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (category = 'technology', page = 1) => {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
            category,
            pageSize: 10,
            page,
            country: 'us',
            apiKey: NEWS_API_KEY,
        },
    });
    return response.data;
};

export const fetchAllCategories = async (page = 1) => {
    const categories = ['technology', 'sports', 'business', 'health', 'entertainment'];
    const promises = categories.map(category => fetchNews(category, page));
    const results = await Promise.all(promises);
    return categories.reduce((acc, category, index) => {
        acc[category] = results[index];
        return acc;
    }, {} as { [key: string]: any });
};