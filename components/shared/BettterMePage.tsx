"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { BadgeList } from "@/constant";
import useDebounce from "@/hooks/useDebounce";
import { fetchNews, loadCachedNews } from "@/utils/NewsUtils";
import NewsCard from "./NewsCard";
import SearchBar from "./SearchBar";
import BadgeGrid from "./BadgeGrid";

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
  const debouncedQuery = useDebounce(query, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery) {
      fetchNews(debouncedQuery, setNews);
    } else {
      loadCachedNews(setNews);
    }
  }, [debouncedQuery]);

  const handleBadgeClick = (badgeName: string) => {
    setQuery(badgeName);
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
      <SearchBar query={query} setQuery={setQuery} />
      <BadgeGrid BadgeList={BadgeList} handleBadgeClick={handleBadgeClick} />
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {news.map((article, i) => (
          <NewsCard
            key={i}
            article={article}
            onClick={() => router.push(article.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default BetterMePage;
