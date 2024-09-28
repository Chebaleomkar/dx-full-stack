import axios from "axios";
import { getToken } from "@/utils/getToken";

interface Article {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

export const fetchNews = async (searchQuery: string, setNews: (news: Article[]) => void) => {
  const cacheKey = `search__${searchQuery}`;
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.get<{ articles: Article[] }>("/api/news", {
      params: { query: searchQuery },
      headers
    });

    const articles = response.data.articles;
    setNews(articles);
    localStorage.setItem(cacheKey, JSON.stringify(articles));
    manageCache(cacheKey);
  } catch (error: any) {
    console.error("Error fetching the news data", error);
  }
};

const manageCache = (newKey: string) => {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith("search__"));
  if (keys.length >= 5) {
    const oldestKey = keys.sort()[0];
    localStorage.removeItem(oldestKey);
  }
};

export const loadCachedNews = (setNews: (news: Article[]) => void) => {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith("search__"));
  if (keys.length > 0) {
    const latestKey = keys.sort().reverse()[0];
    const cachedNews = localStorage.getItem(latestKey);
    if (cachedNews) {
      setNews(JSON.parse(cachedNews));
    }
  }
};