"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreVertical,
  Building2,
  CheckCircle2,
  FileText,
  Home,
  MapPin,
  Pencil,
  Eye,
  Copy,
  Archive,
  Trash2,
  X,
} from "lucide-react";

type PropertyStatus = "Published" | "Draft" | "Sold";

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  price: string;
  status: PropertyStatus;
  image: string;
  units: number;
  updatedAt: string;
  gallery?: string[];
}

interface PropertyFormData {
  name: string;
  location: string;
  type: string;
  price: string;
  units: number;
  image: string;
  gallery: string[];
  status: PropertyStatus;
}

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">No image</text></svg>`
  );

const formatDate = (date: Date = new Date()) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const initialProperties: Property[] = [
  {
    id: "1",
    name: "Green Valley Residency",
    location: "Bangalore, Karnataka",
    type: "Apartment",
    price: "₹85 Lakhs – ₹1.2 Cr",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
    units: 120,
    updatedAt: "Nov 23, 2026",
    gallery: [],
  },
  {
    id: "2",
    name: "Royal Palm Villas",
    location: "Whitefield, Bangalore",
    type: "Villa",
    price: "₹1.5 Cr – ₹2.4 Cr",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    units: 24,
    updatedAt: "Nov 22, 2026",
    gallery: [],
  },
  {
    id: "3",
    name: "Skyline Heights",
    location: "Electronic City, Bangalore",
    type: "Apartment",
    price: "₹65 Lakhs – ₹95 Lakhs",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    units: 80,
    updatedAt: "Nov 20, 2026",
    gallery: [],
  },
  {
    id: "4",
    name: "Lakeview Enclave",
    location: "Sarjapur Road, Bangalore",
    type: "Residential Plot",
    price: "₹45 Lakhs – ₹80 Lakhs",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
    units: 45,
    updatedAt: "Nov 19, 2026",
    gallery: [],
  },
  {
    id: "5",
    name: "Urban Nest",
    location: "Hebbal, Bangalore",
    type: "Apartment",
    price: "₹72 Lakhs – ₹1.1 Cr",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&q=80",
    units: 96,
    updatedAt: "Nov 18, 2026",
    gallery: [],
  },
  {
    id: "6",
    name: "The Grand Estate",
    location: "Devanahalli, Bangalore",
    type: "Villa",
    price: "₹2 Cr – ₹3.5 Cr",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    units: 18,
    updatedAt: "Nov 17, 2026",
    gallery: [],
  },
];

const filters = ["All properties", "Published", "Draft", "Sold"] as const;

const statusStyles: Record<PropertyStatus, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-orange-100 text-orange-700",
  Sold: "bg-gray-100 text-gray-600",
};

const emptyForm: PropertyFormData = {
  name: "",
  location: "",
  type: "Apartment",
  price: "",
  units: 0,
  image: "",
  gallery: [],
  status: "Draft",
};

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All properties");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(
    null
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PropertyFormData>(emptyForm);

  const stats = useMemo(
    () => ({
      total: properties.length,
      published: properties.filter((p) => p.status === "Published").length,
      drafts: properties.filter((p) => p.status === "Draft").length,
      sold: properties.filter((p) => p.status === "Sold").length,
    }),
    [properties]
  );

  const filteredProperties = useMemo(() => {
    const query = search.toLowerCase();

    return properties.filter((property) => {
      const matchesFilter =
        activeFilter === "All properties" || property.status === activeFilter;

      const matchesSearch =
        property.name.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [properties, activeFilter, search]);

  /* ---------- Modal helpers ---------- */

  const openAddModal = () => {
    setEditingPropertyId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingPropertyId(null);
    setFormData(emptyForm);
    setIsModalOpen(false);
  };

  /* ---------- Property actions ---------- */

  const handleStatusChange = (id: string, status: PropertyStatus) => {
    setProperties((current) =>
      current.map((property) =>
        property.id === id
          ? { ...property, status, updatedAt: formatDate() }
          : property
      )
    );
    setOpenMenuId(null);
  };

  const handleDuplicate = (property: Property) => {
    const duplicate: Property = {
      ...property,
      id: crypto.randomUUID(),
      name: `${property.name} (Copy)`,
      status: "Draft",
      updatedAt: formatDate(),
    };

    setProperties((current) => [duplicate, ...current]);
    setOpenMenuId(null);
  };

  const handleDelete = (id: string) => {
    setOpenMenuId(null);

    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    setProperties((current) =>
      current.filter((property) => property.id !== id)
    );
  };

  const handleEditProperty = (property: Property) => {
    setOpenMenuId(null);
    setEditingPropertyId(property.id);

    setFormData({
      name: property.name,
      location: property.location,
      type: property.type,
      price: property.price,
      units: property.units,
      image: property.image,
      gallery: property.gallery ?? [],
      status: property.status,
    });

    setIsModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const image = formData.image || formData.gallery[0] || "";

    if (editingPropertyId) {
      // Update existing property
      setProperties((current) =>
        current.map((property) =>
          property.id === editingPropertyId
            ? {
                ...property,
                ...formData,
                image,
                updatedAt: formatDate(),
              }
            : property
        )
      );
    } else {
      // Create new property
      const newProperty: Property = {
        ...formData,
        id: crypto.randomUUID(),
        image,
        updatedAt: formatDate(),
      };

      setProperties((current) => [newProperty, ...current]);
    }

    closeModal();
    setActiveFilter("All properties");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Property Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your property inventory, listings and availability.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Properties"
            value={stats.total}
            icon={<Building2 size={19} />}
          />
          <StatCard
            label="Published"
            value={stats.published}
            icon={<CheckCircle2 size={19} />}
            color="text-green-600"
          />
          <StatCard
            label="Drafts"
            value={stats.drafts}
            icon={<FileText size={19} />}
            color="text-orange-500"
          />
          <StatCard
            label="Sold / Unavailable"
            value={stats.sold}
            icon={<Home size={19} />}
          />
        </div>

        {/* Property Management */}
        <div className="overflow-visible rounded-xl border border-gray-200 bg-white">
          {/* Toolbar */}
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Manage Properties
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your property inventory and website listings.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search properties..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={openAddModal}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <Plus size={18} />
                  Add Property
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                      activeFilter === filter
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add / Edit Property Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              onClick={closeModal}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {editingPropertyId ? "Edit Property" : "Add New Property"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {editingPropertyId
                        ? "Update the details of this property listing."
                        : "Enter the details to create a new property listing."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Form */}
                <form
                  id="property-form"
                  onSubmit={handleSaveProperty}
                  className="flex-1 space-y-5 overflow-y-auto p-6"
                >
                  {/* Basic Information */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Basic Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Property Name *
                        </label>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Green Valley Residency"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Property Location *
                        </label>
                        <input
                          required
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="City, Area, State"
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Property Type
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) =>
                              setFormData({ ...formData, type: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                          >
                            <option>Apartment</option>
                            <option>Villa</option>
                            <option>Residential Plot</option>
                            <option>Commercial</option>
                            <option>Independent House</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Total Units
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={formData.units}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                units: Number(e.target.value),
                              })
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Pricing */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Pricing Information
                    </h3>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Price Range *
                      </label>
                      <input
                        required
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="e.g. ₹85 Lakhs – ₹1.2 Cr"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Property Image */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Property Image
                    </h3>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="https://example.com/property-image.jpg"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                      />
                      <p className="mt-1.5 text-xs text-gray-400">
                        Paste an image URL. Actual file uploads can be added
                        later.
                      </p>
                    </div>

                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Property preview"
                        className="mt-3 h-36 w-full rounded-lg border border-gray-200 object-cover"
                      />
                    )}
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Publishing */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Publishing Settings
                    </h3>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Property Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.value as PropertyStatus,
                          })
                        }
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500"
                      >
                        <option value="Draft">Save as Draft</option>
                        <option value="Published">Publish Property</option>
                        <option value="Sold">Mark as Sold</option>
                      </select>
                    </div>
                  </div>
                </form>

                {/* Modal Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    form="property-form"
                    className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    {editingPropertyId ? "Save Changes" : "Add Property"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Property List */}
          <div className="divide-y divide-gray-100">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="group flex items-center gap-3 p-4 transition hover:bg-gray-50/70 sm:gap-5 sm:px-5"
                >
                  {/* Image */}
                  <img
                    src={property.image || PLACEHOLDER_IMAGE}
                    alt={property.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                    className="h-20 w-20 shrink-0 rounded-xl border border-gray-100 object-cover sm:h-24 sm:w-24"
                  />

                  {/* Information */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {property.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={13} className="shrink-0" />
                      <span className="truncate">{property.location}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden sm:inline">{property.type}</span>
                    </div>

                    <p className="mt-1.5 text-sm font-semibold text-gray-900">
                      {property.price}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[property.status]}`}
                      >
                        {property.status === "Sold"
                          ? "Sold Out"
                          : property.status}
                      </span>

                      <span className="hidden text-xs text-gray-400 sm:inline">
                        {property.units} units
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative">
                    <button
                      type="button"
                      aria-label="Property actions"
                      aria-expanded={openMenuId === property.id}
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === property.id ? null : property.id
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-black"
                    >
                      <MoreVertical size={19} />
                    </button>

                    {openMenuId === property.id && (
                      <>
                        {/* Click-away layer */}
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setOpenMenuId(null)}
                        />

                        <div className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
                          <Link
                            href={`/properties/${property.id}`}
                            target="_blank"
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <Eye size={15} />
                            View Property
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleEditProperty(property)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <Pencil size={15} />
                            Edit Property
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDuplicate(property)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <Copy size={15} />
                            Duplicate
                          </button>

                          <div className="my-1 border-t border-gray-100" />

                          {property.status !== "Published" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(property.id, "Published")
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle2 size={15} />
                              Publish
                            </button>
                          )}

                          {property.status !== "Sold" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(property.id, "Sold")
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Archive size={15} />
                              Mark as Sold
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(property.id)}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-3 rounded-full bg-gray-100 p-4">
                  <Building2 size={25} className="text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">
                  No properties found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or selected filter.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </p>
            <p className="text-xs text-gray-400">
              Last updated: {formatDate()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Statistics Card
function StatCard({
  label,
  value,
  icon,
  color = "text-gray-900",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
        <span className="text-gray-400">{icon}</span>
      </div>
      <p className={`mt-3 text-2xl font-semibold tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}