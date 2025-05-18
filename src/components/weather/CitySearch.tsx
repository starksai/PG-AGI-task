import React from 'react';

interface CitySearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleCitySearch: (city: string) => void;
}

export default function CitySearch({
  searchInput,
  setSearchInput,
  handleCitySearch,
}: CitySearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCitySearch(searchInput.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6 gap-2">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for cities"
        className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}