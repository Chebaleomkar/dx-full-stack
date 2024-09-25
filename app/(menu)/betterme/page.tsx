"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading } from "@/components/ui/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import { BadgeList } from "@/constant";
import { getToken } from "@/utils/getToken";

// Define the type for the article object
interface Article {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

const BetterMePage: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [query, setQuery] = useState<string>("");
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Load cached news or fetch new news based on the query
  useEffect(() => {
    if (debouncedQuery) {
      fetchNews(debouncedQuery);
    } else {
      loadCachedNews();
    }
  }, [debouncedQuery ]);

  // Fetch news from your Next.js API route
  const fetchNews = async (searchQuery: string) => {
    const cacheKey = `search__${searchQuery}`;

    try {
      const response = await axios.get<{ articles: Article[] }>("/api/news", {
        params: { query: searchQuery }, 
        headers
      });

      const articles = response.data.articles;
      setNews(articles);
      localStorage.setItem(cacheKey, JSON.stringify(articles));

      // Handle FILO cache logic
      manageCache(cacheKey);
    } catch (error: any) {
      console.error("Error fetching the news data", error);
    }
  };

  // Manage the cache to store a limited number of queries
  const manageCache = (newKey: string) => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("search__")
    );

    if (keys.length >= 5) {
      const oldestKey = keys.sort()[0];
      localStorage.removeItem(oldestKey);
    }
  };

  // Load the latest cached news on page load
  const loadCachedNews = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("search__")
    );

    if (keys.length > 0) {
      const latestKey = keys.sort().reverse()[0];
      const cachedNews = localStorage.getItem(latestKey);
      if (cachedNews) {
        setNews(JSON.parse(cachedNews));
      }
    }
  };

  // Handle search input submission
  const handleSearch = () => {
    setQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle badge click for specific categories
  const handleBadgeClick = (badgeName: string) => {
    setQuery(badgeName);
    setActiveBadge(badgeName);

    const interestedKey = "interested";
    let interestedArray: string[] = JSON.parse(
      localStorage.getItem(interestedKey) || "[]"
    );

    if (!interestedArray.includes(badgeName)) {
      interestedArray.push(badgeName);
      localStorage.setItem(interestedKey, JSON.stringify(interestedArray));
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <Heading title="BetterMe" description="Get Ready For Tomorrow" />

      <div className="mb-5 flex flex-col gap-2 mt-5">
        <Label className="text-3xl max-sm:text-xl" htmlFor="query">
          Search
        </Label>
        <div className="flex gap-2">
          <Input
            id="query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search what you like :)"
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSearch} className="flex-shrink-0">
            Search
          </Button>
        </div>
      </div>

      <div className="flex text-xl items-center justify-start gap-1">
        <div className="grid grid-rows-3 grid-flow-col gap-2  overflow-x-auto items-center overflow-y-hidden max-sm:scrollbar-thin md:scrollbar-thumb-gray-400 md:scrollbar-track-slate-200 max-sm:scrollbar-hide p-2 ">
          {BadgeList.map((badge, i) => (
            <Button
              variant={"outline"}
              key={i}
              onClick={() => handleBadgeClick(badge.name)}
              className={`rounded-[50px]  `}
            >
              {badge.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {news.map((article, i) => (
          <Card
            key={i}
            className="shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => router.push(`${article.url}`)}
          >
            <CardHeader className="relative">
              <img
                src={
                  article?.urlToImage
                    ? article.urlToImage
                    : "https://img.freepik.com/free-vector/light-bulb-infographic_23-2148032288.jpg?size=626&ext=jpg&ga=GA1.1.1299948851.1720412662&semt=ais_hybrid"
                }
                alt={article?.title}
                className="object-cover w-full h-48"
              />
            </CardHeader>

            <CardContent className="p-2">
              <CardTitle>
                <strong className="text-lg font-semibold mb-2">
                  {article?.title}
                </strong>
              </CardTitle>
              <CardDescription>
                <p className="line-clamp-5">{article?.description}</p>
              </CardDescription>
            </CardContent>

            <CardFooter>
              <div className="flex mt-5 flex-col gap-2">
                {article?.author && (
                  <div className="flex items-center gap-1 text-[15px] font-semibold">
                    <User size={15} /> {article?.author}
                  </div>
                )}
                <div className="flex items-center gap-1 text-[12px]">
                  <Calendar size={15} />
                  {article?.publishedAt &&
                    new Date(article?.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BetterMePage;
