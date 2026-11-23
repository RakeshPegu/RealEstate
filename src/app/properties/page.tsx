"use client"
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FiSearch,
  FiMapPin,
  FiHeart,
  FiHome,
  FiMaximize2,
  FiSliders,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";
import { FaBath, FaBed } from "react-icons/fa";

const properties = [
  {
    id: 1,
    name: "The Grand Residence",
    location: "Whitefield, Bangalore",
    price: 12500000,
    type: "Villa",
    status: "Buy",
    bedrooms: 4,
    bathrooms: 3,
    area: 2450,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900",
  },
  {
    id: 2,
    name: "Modern Urban Apartment",
    location: "Indiranagar, Bangalore",
    price: 45000,
    type: "Apartment",
    status: "Rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
  },
  {
    id: 3,
    name: "Green Valley Estate",
    location: "Sarjapur Road, Bangalore",
    price: 18500000,
    type: "Villa",
    status: "Buy",
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
  },
  {
    id: 4,
    name: "Skyline Heights",
    location: "Marathahalli, Bangalore",
    price: 7800000,
    type: "Apartment",
    status: "Buy",
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
  },
  {
    id: 5,
    name: "Palm Grove Villa",
    location: "Electronic City, Bangalore",
    price: 65000,
    type: "Villa",
    status: "Rent",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900",
  },
  {
    id: 6,
    name: "Minimalist Living",
    location: "HSR Layout, Bangalore",
    price: 9500000,
    type: "Apartment",
    status: "Buy",
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900",
  },
  {
    id: 7,
    name: "The Oakwood House",
    location: "Yelahanka, Bangalore",
    price: 14500000,
    type: "House",
    status: "Buy",
    bedrooms: 4,
    bathrooms: 3,
    area: 2900,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900",
  },
  {
    id: 8,
    name: "Central City Studio",
    location: "Koramangala, Bangalore",
    price: 28000,
    type: "Apartment",
    status: "Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
  },
] as const;

const formatPrice = (price: number, status: "Buy" | "Rent") => {
  if (status === "Rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }

  return `₹${(price / 10000000).toFixed(2)} Cr`;
};

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [bedrooms, setBedrooms] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("Any");
  const [sort, setSort] = useState("Featured");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        activeStatus === "All" || property.status === activeStatus;

      const matchesType =
        propertyType === "All" || property.type === propertyType;

      const matchesBedrooms =
        bedrooms === "Any" || property.bedrooms >= Number(bedrooms);

      const matchesPrice =
        maxPrice === "Any" ||
        (property.status === "Rent"
          ? property.price <= Number(maxPrice) / 100
          : property.price <= Number(maxPrice) * 100000);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesBedrooms &&
        matchesPrice
      );
    });

    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Featured") {
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [search, activeStatus, propertyType, bedrooms, maxPrice, sort]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setActiveStatus("All");
    setPropertyType("All");
    setBedrooms("Any");
    setMaxPrice("Any");
    setSort("Featured");
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#20221f] md:mt-25">


      {/* Page Heading */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <p className="text-sm text-green-700 font-medium mb-3">
              DISCOVER YOUR NEXT HOME
            </p>

            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Explore Properties
            </h1>

            <p className="text-gray-500 mt-3 text-sm md:text-base">
              Find a place that feels like home.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-black">
              {filteredProperties.length}
            </span> properties
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5">

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 h-12 flex-1">
              <FiSearch className="text-gray-400" size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by property name or location..."
                className="outline-none w-full text-sm bg-transparent"
              />
            </div>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 rounded-xl gap-2"
            >
              <FiSliders />
              Filters
              <FiChevronDown />
            </Button>
          </div>

          {/* Buy / Rent */}
          <div className="flex items-center gap-2 mt-5">
            {["All", "Buy", "Rent"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-6 py-2 rounded-full text-sm transition ${
                  activeStatus === status
                    ? "bg-green-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "All" ? "All Properties" : status}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t mt-5 pt-5">

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border rounded-lg p-3 text-sm bg-white"
                >
                  <option value="All">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Bedrooms (minimum)
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full border rounded-lg p-3 text-sm bg-white"
                >
                  <option value="Any">Any Bedrooms</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-2 block">
                  Maximum Price
                </label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border rounded-lg p-3 text-sm bg-white"
                >
                  <option value="Any">Any Price</option>
                  <option value="5000">₹50 Lakh / ₹50K rent</option>
                  <option value="10000">₹1 Cr / ₹1L rent</option>
                  <option value="15000">₹1.5 Cr / ₹1.5L rent</option>
                  <option value="20000">₹2 Cr / ₹2L rent</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Property Listing */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-10">

        {/* Listing Toolbar */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-lg font-semibold">
            Available Properties
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Cards */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 group hover:shadow-lg transition-all duration-300"
              >

                {/* Image */}
                <div className="relative h-[230px] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium">
                      For {property.status}
                    </span>

                    {property.featured && (
                      <span className="bg-green-800 text-white text-xs px-3 py-1.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleFavorite(property.id)}
                    aria-label="Toggle favourite"
                    className="absolute top-4 right-4 bg-white rounded-full p-2.5 hover:bg-gray-100 transition"
                  >
                    <FiHeart
                      size={18}
                      className={
                        favorites.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5">

                  <p className="text-green-800 font-semibold text-xl">
                    {formatPrice(property.price, property.status)}
                  </p>

                  <h3 className="text-lg font-semibold mt-2 group-hover:text-green-800 transition">
                    {property.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2">
                    <FiMapPin size={15} />
                    {property.location}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 mt-5 pt-4 text-gray-600 text-xs">

                    <div className="flex items-center gap-1.5">
                      <FaBed size={16} />
                      {property.bedrooms} Beds
                    </div>

                    <div className="flex items-center gap-1.5">
                      <FaBath size={14} />
                      {property.bathrooms} Baths
                    </div>

                    <div className="flex items-center gap-1.5">
                      <FiMaximize2 size={15} />
                      {property.area} sqft
                    </div>
                  </div>

                  <button className="w-full mt-5 flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium hover:bg-green-800 hover:text-white hover:border-green-800 transition">
                    View Property
                    <FiArrowUpRight size={18} />
                  </button>

                </div>
              </article>
            ))}

          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl py-20 text-center">
            <FiSearch size={35} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold">No properties found</h3>
            <p className="text-gray-500 text-sm mt-2">
              Try changing your search or filters.
            </p>
            <Button
              onClick={clearFilters}
              className="mt-5 bg-green-800 hover:bg-green-700 rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 Estate. All rights reserved.</p>
          <p>Find a place you can call home.</p>
        </div>
      </footer>

    </main>
  );
}
