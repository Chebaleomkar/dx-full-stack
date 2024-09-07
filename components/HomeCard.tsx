import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface HomeCardProps {
  heading: string;
  subHeading: string;
  buttonText?: string;
  navigateTo?: string;
  imageUrl?: string;
}

const HomeCard = ({
  heading,
  subHeading,
  buttonText,
  navigateTo,
  imageUrl,
}: HomeCardProps) => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-6 text-black ">
      <div className="max-w-4xl w-full bg  rounded-3xl shadow-xl  p-8 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-2/3">
          <h2 className="font-extrabold text-5xl text-center md:text-left mb-6 leading-tight ">
            {heading}
          </h2>
          <p className="text-lg text-center md:text-left mb-8 ">
            {subHeading}
          </p>
          {buttonText && (
            <div className="flex justify-center md:justify-start">
              {navigateTo && (
                <Link href={navigateTo}>
                  <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 ease-in-out">
                    {buttonText}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
        {imageUrl && (
          <img
            className="rounded-3xl h-64 w-64 object-cover shadow-lg"
            src={imageUrl}
            alt={heading}
          />
        )}
      </div>
    </div>
  );
};

export default HomeCard;
