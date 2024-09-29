import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
const apiKeys = [
  "f89b07d235f746db8d044767084cece5",
  "d3abd637ac9c4b57a05e1cff74c5b687",
];

let currentKeyIndex = 0; 
const rotateApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
};
const fetchNewsWithRetry = async (searchQuery: string) => {
  let attempt = 0;
  while (attempt < apiKeys.length) {
    try {
      const apiKey = apiKeys[currentKeyIndex];
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: searchQuery,
          apiKey,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.code === "rateLimited") {
        rotateApiKey();
        attempt++;
      } else {
        throw error;
      }
    }
  }
  throw new Error("All API keys have been rate-limited");
};

export async function GET(request: NextRequest ) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "default";
  try {
    const newsData = await fetchNewsWithRetry(query);
    return NextResponse.json(newsData);
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
