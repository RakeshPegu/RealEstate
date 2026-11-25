
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  CalendarCheck,
  CalendarDays,
  Clock,
  CheckCircle2,
  X,
  Pencil,
  Eye,
  Trash2,
  UserRound,
  MapPin,
  Phone,
  Mail,
  Building2,
  StickyNote,
  Users,
  Check,
  Ban,
  RefreshCw,
} from "lucide-react";

type VisitStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

interface SiteVisit {
  id: string;
  customer: string;
  email: string;
  phone: string;
  property: string;
  location: string;
  visitDate: string;
  visitTime: string;
  assignedTo: string;
  status: VisitStatus;
  visitors: number;
  notes: string;
  createdAt: string;
}

const initialVisits: SiteVisit[] = [
  {
    id: "VIS001",
    customer: "Rahul Verma",
    email: "rahul@example.com",
    phone: "+91 99887 66554",
    property: "Skyline Heights",
    location: "Electronic City, Bangalore",
    visitDate: "2026-11-25",
    visitTime: "11:00",
    assignedTo: "Amit Kumar",
    status: "Confirmed",
    visitors: 2,
    notes: "Interested in a 3 BHK. Customer prefers an afternoon discussion about pricing.",
    createdAt: "Nov 22, 2026",
  },
  {
    id: "VIS002",
    customer: "Ankit Sharma",
    email: "ankit@example.com",
    phone: "+91 98765 43210",
    property: "Green Valley Residency",
    location: "Whitefield, Bangalore",
    visitDate: "2026-11-26",
    visitTime: "15:30",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    visitors: 3,
    notes: "Customer wants to inspect available 3 BHK apartments.",
    createdAt: "Nov 24, 2026",
  },
  {
    id: "VIS003",
    customer: "Priya Mehta",
    email: "priya@example.com",
    phone: "+91 98765 12345",
    property: "Royal Palm Villas",
    location: "Whitefield, Bangalore",
    visitDate: "2026-11-24",
    visitTime: "10:30",
    assignedTo: "Priya Das",
    status: "Completed",
    visitors: 2,
    notes: "Visited the sample villa. Interested in discussing payment plans.",
    createdAt: "Nov 20, 2026",
  },
  {
    id: "VIS004",
    customer: "Sneha Roy",
    email: "sneha@example.com",
    phone: "+91 87654 32109",
    property: "Lakeview Enclave",
    location: "Sarjapur Road, Bangalore",
    visitDate: "2026-11-27",
    visitTime: "12:00",
    assignedTo: "Sneha Roy",
    status: "Rescheduled",
    visitors: 4,
    notes: "Customer requested a new date due to personal commitments.",
    createdAt: "Nov 21, 2026",
  },
  {
    id: "VIS005",
    customer: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 91234 56789",
    property: "Urban Nest",
    location: "Hebbal, Bangalore",
    visitDate: "2026-11-23",
    visitTime: "16:00",
    assignedTo: "Neha Sharma",
    status: "Cancelled",
    visitors: 2,
    notes: "Customer cancelled the visit.",
    createdAt: "Nov 19, 2026",
  },
  {
    id: "VIS006",
    customer: "Neha Kapoor",
    email: "neha@example.com",
    phone: "+91 90123 45678",
    property: "Green Valley Residency",
    location: "Whitefield, Bangalore",
    visitDate: "2026-11-28",
    visitTime: "11:30",
    assignedTo: "Unassigned",
    status: "Pending",
    visitors: 2,
    notes: "Looking for a 2 BHK apartment.",
    createdAt: "Nov 24, 2026",
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
];

const statuses: VisitStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Rescheduled",
  "Cancelled",
];

const filters = [
  "All Visits",
  "Pending",
  "Confirmed",
  "Completed",
  "Rescheduled",
  "Cancelled",
] as const;

const statusStyles: Record<VisitStatus, string> = {
  Pending: "bg-orange-100 text-orange-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Rescheduled: "bg-purple-100 text-purple-700",
  Cancelled: "bg-gray-100 text-gray-600",
};

const emptyForm = {
  customer: "",
  email: "",
  phone: "",
  property: "Green Valley Residency",
  location: "",
  visitDate: "",
  visitTime: "11:00",
  assignedTo: "Unassigned",
  status: "Pending" as VisitStatus,
  visitors: 2,
  notes: "",
};

export default function SiteVisitManagementPage() {
  const [visits, setVisits] = useState(initialVisits);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All Visits");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewVisit, setViewVisit] = useState<SiteVisit | null>(null);

  const [formData, setFormData] = useState(emptyForm);

  const updateField = <K extends keyof typeof emptyForm>(
    field: K,
    value: (typeof emptyForm)[K]
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Statistics
  const stats = useMemo(() => ({
    total: visits.length,
    pending: visits.filter((v) => v.status === "Pending").length,
    confirmed: visits.filter((v) => v.status === "Confirmed").length,
    completed: visits.filter((v) => v.status === "Completed").length,
    cancelled: visits.filter((v) => v.status === "Cancelled").length,
  }), [visits]);

  // Search and filters
  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const matchesFilter =
        activeFilter === "All Visits" ||
        visit.status === activeFilter;

      const query = search.toLowerCase();

      const matchesSearch = [
        visit.id,
        visit.customer,
        visit.phone,
        visit.email,
        visit.property,
        visit.assignedTo,
      ].some((value) => value.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [visits, activeFilter, search]);

  // Add visit
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setIsModalOpen(true);
  };

  // Edit visit
  const openEditModal = (visit: SiteVisit) => {
    setEditingId(visit.id);

    setFormData({
      customer: visit.customer,
      email: visit.email,
      phone: visit.phone,
      property: visit.property,
      location: visit.location,
      visitDate: visit.visitDate,
      visitTime: visit.visitTime,
      assignedTo: visit.assignedTo,
      status: visit.status,
      visitors: visit.visitors,
      notes: visit.notes,
    });

    setIsModalOpen(true);
  };

  // Save visit
  const handleSaveVisit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      setVisits((current) =>
        current.map((visit) =>
          visit.id === editingId
            ? { ...visit, ...formData }
            : visit
        )
      );
    } else {
      const newVisit: SiteVisit = {
        ...formData,
        id: `VIS${String(Date.now()).slice(-6)}`,
        createdAt: new Date().toLocaleDateString("en-IN", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      setVisits((current) => [newVisit, ...current]);
    }

    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ ...emptyForm });
  };

  // Update status
  const updateStatus = (id: string, status: VisitStatus) => {
    setVisits((current) =>
      current.map((visit) =>
        visit.id === id ? { ...visit, status } : visit
      )
    );
  };

  // Assign employee
  const assignEmployee = (id: string, employee: string) => {
    setVisits((current) =>
      current.map((visit) =>
        visit.id === id
          ? { ...visit, assignedTo: employee }
          : visit
      )
    );
  };

  // Delete visit
  const deleteVisit = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this site visit?")) {
      return;
    }

    setVisits((current) =>
      current.filter((visit) => visit.id !== id)
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "Not scheduled";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    if (!time) return "";

    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Site Visit Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Schedule property visits, coordinate employees and track customer visits.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus size={18} />
            Schedule Site Visit
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <StatCard label="Total Visits" value={stats.total} icon={<CalendarCheck size={19} />} />
          <StatCard label="Pending" value={stats.pending} icon={<Clock size={19} />} color="text-orange-600" />
          <StatCard label="Confirmed" value={stats.confirmed} icon={<CheckCircle2 size={19} />} color="text-blue-600" />
          <StatCard label="Completed" value={stats.completed} icon={<Check size={19} />} color="text-green-600" />
          <StatCard label="Cancelled" value={stats.cancelled} icon={<Ban size={19} />} color="text-gray-500" />
        </div>

        {/* Main List */}
        <div className="overflow-visible rounded-xl border border-gray-200 bg-white">

          {/* Toolbar */}
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Customer Site Visits
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View visit requests, schedule appointments and manage assigned employees.
                </p>
              </div>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customer, property, phone or visit ID..."
                  className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
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
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-gray-50/80">
                <tr className="border-b border-gray-100">
                  {[
                    "Customer",
                    "Property",
                    "Visit Schedule",
                    "Assigned Employee",
                    "Visitors",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-xs font-medium text-gray-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredVisits.length > 0 ? (
                  filteredVisits.map((visit) => (
                    <tr key={visit.id} className="transition hover:bg-gray-50/70">

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <button onClick={() => setViewVisit(visit)} className="text-left">
                          <p className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                            {visit.customer}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">{visit.phone}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{visit.id}</p>
                        </button>
                      </td>

                      {/* Property */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-800">{visit.property}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {visit.location}
                        </p>
                      </td>

                      {/* Schedule */}
                      <td className="px-5 py-4">
                        <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <CalendarDays size={14} className="text-gray-400" />
                          {formatDate(visit.visitDate)}
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={13} className="text-gray-400" />
                          {formatTime(visit.visitTime)}
                        </p>
                      </td>

                      {/* Employee */}
                      <td className="px-5 py-4">
                        <select
                          value={visit.assignedTo}
                          onChange={(e) => assignEmployee(visit.id, e.target.value)}
                          className="max-w-[150px] rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-gray-400"
                        >
                          <option>Unassigned</option>
                          {employees.map((employee) => (
                            <option key={employee}>{employee}</option>
                          ))}
                        </select>
                      </td>

                      {/* Visitors */}
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-2 text-sm text-gray-600">
                          <Users size={15} className="text-gray-400" />
                          {visit.visitors}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={visit.status}
                          onChange={(e) =>
                            updateStatus(visit.id, e.target.value as VisitStatus)
                          }
                          className={`cursor-pointer rounded-full border-0 px-2.5 py-1.5 text-[11px] font-medium outline-none ${statusStyles[visit.status]}`}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
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
                              onClick={() => setViewVisit(visit)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Eye size={15} />
                              View Details
                            </button>

                            <button
                              onClick={() => openEditModal(visit)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Pencil size={15} />
                              Edit Visit
                            </button>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              onClick={() => deleteVisit(visit.id)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                              Delete Visit
                            </button>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <CalendarCheck size={28} className="mx-auto mb-3 text-gray-300" />
                      <p className="font-medium text-gray-900">No site visits found</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-500">
              Showing {filteredVisits.length} of {visits.length} site visits
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
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Site Visit" : "Schedule Site Visit"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter customer and appointment details.
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

            <form
              id="visit-form"
              onSubmit={handleSaveVisit}
              className="flex-1 space-y-5 overflow-y-auto p-6"
            >
              {/* Customer */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Customer Information
                </h3>

                <div className="space-y-4">
                  <FormField label="Customer Name" required>
                    <input
                      required
                      value={formData.customer}
                      onChange={(e) => updateField("customer", e.target.value)}
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
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="customer@example.com"
                        className="form-input"
                      />
                    </FormField>

                    <FormField label="Phone Number" required>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="form-input"
                      />
                    </FormField>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Property */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Property Information
                </h3>

                <div className="space-y-4">
                  <FormField label="Select Property" required>
                    <select
                      required
                      value={formData.property}
                      onChange={(e) => updateField("property", e.target.value)}
                      className="form-input bg-white"
                    >
                      {properties.map((property) => (
                        <option key={property}>{property}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Property Location">
                    <input
                      value={formData.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      placeholder="Enter property location"
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Schedule */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Visit Schedule
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Visit Date" required>
                    <input
                      required
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.visitDate}
                      onChange={(e) => updateField("visitDate", e.target.value)}
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Visit Time" required>
                    <input
                      required
                      type="time"
                      value={formData.visitTime}
                      onChange={(e) => updateField("visitTime", e.target.value)}
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Number of Visitors" required>
                    <input
                      required
                      type="number"
                      min="1"
                      max="20"
                      value={formData.visitors}
                      onChange={(e) => updateField("visitors", Number(e.target.value))}
                      className="form-input"
                    />
                  </FormField>

                  <FormField label="Assign Employee">
                    <select
                      value={formData.assignedTo}
                      onChange={(e) => updateField("assignedTo", e.target.value)}
                      className="form-input bg-white"
                    >
                      <option>Unassigned</option>
                      {employees.map((employee) => (
                        <option key={employee}>{employee}</option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Visit Status">
                    <select
                      value={formData.status}
                      onChange={(e) => updateField("status", e.target.value as VisitStatus)}
                      className="form-input bg-white"
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Notes */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Visit Notes
                </h3>

                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="Customer requirements, special instructions or discussion notes..."
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>
            </form>

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
                form="visit-form"
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editingId ? "Update Visit" : "Schedule Visit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewVisit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setViewVisit(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Site Visit Details
                </h2>
                <p className="mt-1 text-xs text-gray-500">{viewVisit.id}</p>
              </div>

              <button
                onClick={() => setViewVisit(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
                {viewVisit.customer
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">{viewVisit.customer}</h3>
                <p className="text-xs text-gray-500">
                  Request received {viewVisit.createdAt}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[viewVisit.status]}`}>
                {viewVisit.status}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <DetailRow icon={<Mail size={16} />} label="Email" value={viewVisit.email} />
              <DetailRow icon={<Phone size={16} />} label="Phone" value={viewVisit.phone} />
              <DetailRow icon={<Building2 size={16} />} label="Property" value={viewVisit.property} />
              <DetailRow icon={<MapPin size={16} />} label="Location" value={viewVisit.location} />
              <DetailRow icon={<CalendarDays size={16} />} label="Visit Date" value={formatDate(viewVisit.visitDate)} />
              <DetailRow icon={<Clock size={16} />} label="Visit Time" value={formatTime(viewVisit.visitTime)} />
              <DetailRow icon={<Users size={16} />} label="Number of Visitors" value={String(viewVisit.visitors)} />
              <DetailRow icon={<UserRound size={16} />} label="Assigned Employee" value={viewVisit.assignedTo} />
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <StickyNote size={16} />
                Visit Notes
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {viewVisit.notes || "No notes added."}
              </p>
            </div>

            <button
              onClick={() => {
                openEditModal(viewVisit);
                setViewVisit(null);
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Pencil size={16} />
              Edit Visit
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
        <p className="text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
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
        <p className="truncate text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}
