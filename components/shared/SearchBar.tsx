import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const handleSearch = () => setQuery(query);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
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
  );
};

export default SearchBar;