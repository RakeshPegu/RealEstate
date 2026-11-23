"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (city) query.set("city", city);
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);
    router.push(`/properties?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-32 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        min="0"
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-32 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        min="0"
      />
      <button
        type="submit"
        className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
      >
        Search
      </button>
    </form>
  );
}

