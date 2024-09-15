import { NextResponse } from "next/server";
import axios from "axios";

// List of API keys to rotate
const apiKeys = [
  "f89b07d235f746db8d044767084cece5",
  "d3abd637ac9c4b57a05e1cff74c5b687",
];

let currentKeyIndex = 0; // Index to track which API key is being used

// Function to rotate API keys
const rotateApiKey = () => {
  currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
};

// Function to fetch news data
const fetchNewsWithRetry = async (searchQuery: string) => {
  let attempt = 0;

  // Retry logic, loop through all API keys
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
      // If rate-limited, rotate the API key and try again
      if (error.response?.data?.code === "rateLimited") {
        rotateApiKey();
        attempt++;
      } else {
        // Throw other errors (e.g., network issues, invalid queries)
        throw error;
      }
    }
  }

  throw new Error("All API keys have been rate-limited");
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "default"; // Default query if none provided

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
