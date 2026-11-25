
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  MessageSquare,
  Phone,
  CalendarCheck,
  CheckCircle2,
  Clock,
  X,
  Pencil,
  Eye,
  Trash2,
  UserRound,
  MapPin,
  Mail,
  Building2,
  CalendarDays,
  StickyNote,
  UserCheck,
} from "lucide-react";

type EnquiryStatus =
  | "New"
  | "Contacted"
  | "Site Visit Scheduled"
  | "Converted"
  | "Closed";

interface Enquiry {
  id: string;
  customer: string;
  email: string;
  phone: string;
  property: string;
  propertyLocation: string;
  source: string;
  status: EnquiryStatus;
  assignedTo: string;
  createdAt: string;
  followUpDate: string;
  notes: string;
}

const initialEnquiries: Enquiry[] = [
  {
    id: "ENQ001",
    customer: "Ankit Sharma",
    email: "ankit@example.com",
    phone: "+91 98765 43210",
    property: "Green Valley Residency",
    propertyLocation: "Whitefield, Bangalore",
    source: "Website",
    status: "New",
    assignedTo: "Rahul Sharma",
    createdAt: "Nov 24, 2026",
    followUpDate: "Nov 25, 2026",
    notes: "Interested in a 3 BHK apartment. Requested pricing details.",
  },
  {
    id: "ENQ002",
    customer: "Priya Mehta",
    email: "priya@example.com",
    phone: "+91 98765 12345",
    property: "Royal Palm Villas",
    propertyLocation: "Whitefield, Bangalore",
    source: "Website",
    status: "Contacted",
    assignedTo: "Priya Das",
    createdAt: "Nov 23, 2026",
    followUpDate: "Nov 25, 2026",
    notes: "Called customer. Discussed pricing and payment options.",
  },
  {
    id: "ENQ003",
    customer: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 99887 66554",
    property: "Skyline Heights",
    propertyLocation: "Electronic City, Bangalore",
    source: "WhatsApp",
    status: "Site Visit Scheduled",
    assignedTo: "Amit Kumar",
    createdAt: "Nov 22, 2026",
    followUpDate: "Nov 27, 2026",
    notes: "Site visit scheduled. Customer prefers afternoon.",
  },
  {
    id: "ENQ004",
    customer: "Sneha Roy",
    email: "sneha@example.com",
    phone: "+91 87654 32109",
    property: "Lakeview Enclave",
    propertyLocation: "Sarjapur Road, Bangalore",
    source: "Referral",
    status: "Converted",
    assignedTo: "Rahul Sharma",
    createdAt: "Nov 20, 2026",
    followUpDate: "Nov 26, 2026",
    notes: "Customer booked a residential plot.",
  },
  {
    id: "ENQ005",
    customer: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 91234 56789",
    property: "Urban Nest",
    propertyLocation: "Hebbal, Bangalore",
    source: "Website",
    status: "Closed",
    assignedTo: "Neha Sharma",
    createdAt: "Nov 19, 2026",
    followUpDate: "",
    notes: "Customer decided not to proceed.",
  },
  {
    id: "ENQ006",
    customer: "Neha Kapoor",
    email: "neha@example.com",
    phone: "+91 90123 45678",
    property: "Green Valley Residency",
    propertyLocation: "Whitefield, Bangalore",
    source: "Facebook",
    status: "New",
    assignedTo: "Unassigned",
    createdAt: "Nov 24, 2026",
    followUpDate: "",
    notes: "Looking for a 2 BHK apartment.",
  },
  {
    id: "ENQ007",
    customer: "Vikram Das",
    email: "vikram@example.com",
    phone: "+91 90909 80808",
    property: "Royal Palm Villas",
    propertyLocation: "Whitefield, Bangalore",
    source: "Phone Call",
    status: "Contacted",
    assignedTo: "Amit Kumar",
    createdAt: "Nov 18, 2026",
    followUpDate: "Nov 26, 2026",
    notes: "Interested in premium villas. Follow up next week.",
  },
];

const employees = [
  "Rahul Sharma",
  "Priya Das",
  "Amit Kumar",
  "Sneha Roy",
  "Neha Sharma",
];

const properties = [
  "Green Valley Residency",
  "Royal Palm Villas",
  "Skyline Heights",
  "Lakeview Enclave",
  "Urban Nest",
  "Other",
];

const statuses: EnquiryStatus[] = [
  "New",
  "Contacted",
  "Site Visit Scheduled",
  "Converted",
  "Closed",
];

const filters = [
  "All Enquiries",
  "New",
  "Contacted",
  "Site Visit Scheduled",
  "Converted",
  "Closed",
] as const;

const statusStyles: Record<EnquiryStatus, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-orange-100 text-orange-700",
  "Site Visit Scheduled": "bg-purple-100 text-purple-700",
  Converted: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

const emptyForm = {
  customer: "",
  email: "",
  phone: "",
  property: "Green Valley Residency",
  propertyLocation: "",
  source: "Website",
  status: "New" as EnquiryStatus,
  assignedTo: "Unassigned",
  followUpDate: "",
  notes: "",
};

export default function EnquiryManagementPage() {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All Enquiries");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewEnquiry, setViewEnquiry] = useState<Enquiry | null>(null);

  const [formData, setFormData] = useState(emptyForm);

  // Statistics
  const stats = useMemo(() => ({
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "New").length,
    contacted: enquiries.filter((e) => e.status === "Contacted").length,
    visits: enquiries.filter(
      (e) => e.status === "Site Visit Scheduled"
    ).length,
    converted: enquiries.filter(
      (e) => e.status === "Converted"
    ).length,
  }), [enquiries]);

  // Search and filters
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const matchesFilter =
        activeFilter === "All Enquiries" ||
        enquiry.status === activeFilter;

      const query = search.toLowerCase();

      const matchesSearch = [
        enquiry.customer,
        enquiry.email,
        enquiry.phone,
        enquiry.property,
        enquiry.id,
        enquiry.assignedTo,
      ].some((value) => value.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [enquiries, activeFilter, search]);

  // Add enquiry
  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  // Edit enquiry
  const openEditModal = (enquiry: Enquiry) => {
    setEditingId(enquiry.id);

    setFormData({
      customer: enquiry.customer,
      email: enquiry.email,
      phone: enquiry.phone,
      property: enquiry.property,
      propertyLocation: enquiry.propertyLocation,
      source: enquiry.source,
      status: enquiry.status,
      assignedTo: enquiry.assignedTo,
      followUpDate: enquiry.followUpDate,
      notes: enquiry.notes,
    });

    setIsModalOpen(true);
  };

  // Save enquiry
  const handleSaveEnquiry = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (editingId) {
      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === editingId
            ? { ...enquiry, ...formData }
            : enquiry
        )
      );
    } else {
      const newEnquiry: Enquiry = {
        ...formData,
        id: `ENQ${String(Date.now()).slice(-6)}`,
        createdAt: new Date().toLocaleDateString("en-IN", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setEnquiries((current) => [newEnquiry, ...current]);
    }

    setIsModalOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  // Update status
  const updateStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === id ? { ...enquiry, status } : enquiry
      )
    );
  };

  // Delete
  const deleteEnquiry = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) {
      return;
    }

    setEnquiries((current) =>
      current.filter((enquiry) => enquiry.id !== id)
    );
  };

  // Assign employee
  const assignEmployee = (id: string, employee: string) => {
    setEnquiries((current) =>
      current.map((enquiry) =>
        enquiry.id === id
          ? { ...enquiry, assignedTo: employee }
          : enquiry
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Enquiry Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track customer enquiries, manage follow-ups and convert leads into bookings.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard
            label="Total Enquiries"
            value={stats.total}
            icon={<MessageSquare size={19} />}
          />
          <StatCard
            label="New Enquiries"
            value={stats.new}
            icon={<Plus size={19} />}
            color="text-blue-600"
          />
          <StatCard
            label="Contacted"
            value={stats.contacted}
            icon={<Phone size={19} />}
            color="text-orange-600"
          />
          <StatCard
            label="Site Visits"
            value={stats.visits}
            icon={<CalendarCheck size={19} />}
            color="text-purple-600"
          />
          <StatCard
            label="Converted"
            value={stats.converted}
            icon={<CheckCircle2 size={19} />}
            color="text-green-600"
          />
        </div>

        {/* Enquiry List */}
        <div className="overflow-visible rounded-xl border border-gray-200 bg-white">

          {/* Toolbar */}
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4">

              <div>
                <h2 className="font-semibold text-gray-900">
                  Customer Enquiries
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage enquiries received from different channels.
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
                    placeholder="Search customer, property, phone or ID..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <button
                  onClick={openAddModal}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  <Plus size={18} />
                  Add Enquiry
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-gray-50/80">
                <tr className="border-b border-gray-100">
                  {[
                    "Customer",
                    "Property",
                    "Source",
                    "Assigned To",
                    "Follow-up",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-xs font-medium text-gray-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="transition hover:bg-gray-50/70"
                    >
                      {/* Customer */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setViewEnquiry(enquiry)}
                          className="text-left"
                        >
                          <p className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                            {enquiry.customer}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {enquiry.phone}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {enquiry.id}
                          </p>
                        </button>
                      </td>

                      {/* Property */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-800">
                          {enquiry.property}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {enquiry.propertyLocation}
                        </p>
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-gray-100 px-2.5 py-1.5 text-xs text-gray-600">
                          {enquiry.source}
                        </span>
                      </td>

                      {/* Assigned Employee */}
                      <td className="px-5 py-4">
                        <select
                          value={enquiry.assignedTo}
                          onChange={(e) =>
                            assignEmployee(enquiry.id, e.target.value)
                          }
                          className="max-w-[145px] rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-gray-400"
                        >
                          <option>Unassigned</option>
                          {employees.map((employee) => (
                            <option key={employee}>{employee}</option>
                          ))}
                        </select>
                      </td>

                      {/* Follow Up */}
                      <td className="px-5 py-4">
                        {enquiry.followUpDate ? (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <CalendarDays size={14} className="text-gray-400" />
                            {enquiry.followUpDate}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Not scheduled
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={enquiry.status}
                          onChange={(e) =>
                            updateStatus(
                              enquiry.id,
                              e.target.value as EnquiryStatus
                            )
                          }
                          className={`max-w-[165px] cursor-pointer rounded-full border-0 px-2.5 py-1.5 text-[11px] font-medium outline-none ${statusStyles[enquiry.status]}`}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <details className="group/menu relative">
                          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
                            <MoreVertical size={19} />
                          </summary>

                          <div className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">

                            <button
                              onClick={() => setViewEnquiry(enquiry)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Eye size={15} />
                              View Details
                            </button>

                            <button
                              onClick={() => openEditModal(enquiry)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Pencil size={15} />
                              Edit Enquiry
                            </button>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              onClick={() => deleteEnquiry(enquiry.id)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                              Delete Enquiry
                            </button>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <MessageSquare
                        size={28}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="font-medium text-gray-900">
                        No enquiries found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-500">
              Showing {filteredEnquiries.length} of {enquiries.length} enquiries
            </p>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Enquiry" : "Add New Enquiry"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter customer details and manage enquiry information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              id="enquiry-form"
              onSubmit={handleSaveEnquiry}
              className="flex-1 space-y-5 overflow-y-auto p-6"
            >
              {/* Customer Information */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Customer Information
                </h3>

                <div className="space-y-4">
                  <FormField label="Customer Name" required>
                    <input
                      required
                      value={formData.customer}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customer: e.target.value,
                        })
                      }
                      placeholder="Enter customer name"
                      className="form-input"
                    />
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Email Address" required>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        placeholder="customer@example.com"
                        className="form-input"
                      />
                    </FormField>

                    <FormField label="Phone Number" required>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 98765 43210"
                        className="form-input"
                      />
                    </FormField>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Property Information */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Property Information
                </h3>

                <div className="space-y-4">
                  <FormField label="Interested Property" required>
                    <select
                      required
                      value={formData.property}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          property: e.target.value,
                        })
                      }
                      className="form-input bg-white"
                    >
                      {properties.map((property) => (
                        <option key={property}>{property}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Property Location">
                    <input
                      value={formData.propertyLocation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyLocation: e.target.value,
                        })
                      }
                      placeholder="Property location"
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Enquiry Management */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Enquiry Management
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Enquiry Source">
                    <select
                      value={formData.source}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          source: e.target.value,
                        })
                      }
                      className="form-input bg-white"
                    >
                      <option>Website</option>
                      <option>WhatsApp</option>
                      <option>Facebook</option>
                      <option>Instagram</option>
                      <option>Referral</option>
                      <option>Phone Call</option>
                      <option>Walk-in</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Enquiry Status">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as EnquiryStatus,
                        })
                      }
                      className="form-input bg-white"
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Assign Employee">
                    <select
                      value={formData.assignedTo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignedTo: e.target.value,
                        })
                      }
                      className="form-input bg-white"
                    >
                      <option>Unassigned</option>
                      {employees.map((employee) => (
                        <option key={employee}>{employee}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Next Follow-up Date">
                    <input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          followUpDate: e.target.value,
                        })
                      }
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Notes */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Internal Notes
                </h3>

                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Add customer requirements, call notes or follow-up details..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="enquiry-form"
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editingId ? "Update Enquiry" : "Add Enquiry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setViewEnquiry(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Enquiry Details
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {viewEnquiry.id}
                </p>
              </div>

              <button
                onClick={() => setViewEnquiry(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
                  {viewEnquiry.customer
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {viewEnquiry.customer}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Received {viewEnquiry.createdAt}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[viewEnquiry.status]}`}>
                  {viewEnquiry.status}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <DetailRow
                icon={<Mail size={16} />}
                label="Email"
                value={viewEnquiry.email}
              />
              <DetailRow
                icon={<Phone size={16} />}
                label="Phone"
                value={viewEnquiry.phone}
              />
              <DetailRow
                icon={<Building2 size={16} />}
                label="Interested Property"
                value={viewEnquiry.property}
              />
              <DetailRow
                icon={<MapPin size={16} />}
                label="Location"
                value={viewEnquiry.propertyLocation}
              />
              <DetailRow
                icon={<UserRound size={16} />}
                label="Assigned Employee"
                value={viewEnquiry.assignedTo}
              />
              <DetailRow
                icon={<CalendarDays size={16} />}
                label="Next Follow-up"
                value={viewEnquiry.followUpDate || "Not scheduled"}
              />
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <StickyNote size={16} />
                Internal Notes
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {viewEnquiry.notes || "No notes added."}
              </p>
            </div>

            <button
              onClick={() => {
                openEditModal(viewEnquiry);
                setViewEnquiry(null);
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Pencil size={16} />
              Edit Enquiry
            </button>
          </div>
        </div>
      )}
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
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-gray-500 sm:text-sm">
          {label}
        </p>
        <span className="text-gray-400">{icon}</span>
      </div>
      <p className={`mt-3 text-2xl font-semibold tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}

// Form Field
function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

// Details Row
function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="truncate text-sm font-medium text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}
