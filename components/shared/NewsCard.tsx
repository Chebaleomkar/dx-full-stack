import React from "react";
import { Calendar, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Article {
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

interface NewsCardProps {
  article: Article;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  return (
    <Card
      className="shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <CardHeader className="relative">
        <img
          src={
            article?.urlToImage ||
            "https://img.freepik.com/free-vector/light-bulb-infographic_23-2148032288.jpg?size=626&ext=jpg&ga=GA1.1.1299948851.1720412662&semt=ais_hybrid"
          }
          alt={article?.title}
          className="object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent className="p-2">
        <CardTitle>
          <strong className="text-lg font-semibold mb-2">{article?.title}</strong>
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
            {article?.publishedAt && new Date(article?.publishedAt).toLocaleDateString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;