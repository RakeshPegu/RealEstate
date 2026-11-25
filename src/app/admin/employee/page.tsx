
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Users,
  UserCheck,
  UserX,
  BriefcaseBusiness,
  X,
  Pencil,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
} from "lucide-react";

type EmployeeStatus = "Active" | "Inactive";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
  joinedAt: string;
  assignedLeads: number;
  siteVisits: number;
}

const initialEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    role: "Sales Manager",
    department: "Sales",
    location: "Bangalore",
    status: "Active",
    joinedAt: "Jan 12, 2025",
    assignedLeads: 28,
    siteVisits: 14,
  },
  {
    id: "EMP002",
    name: "Priya Das",
    email: "priya@example.com",
    phone: "+91 98765 12345",
    role: "Sales Executive",
    department: "Sales",
    location: "Bangalore",
    status: "Active",
    joinedAt: "Mar 08, 2025",
    assignedLeads: 19,
    siteVisits: 11,
  },
  {
    id: "EMP003",
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 99887 66554",
    role: "Sales Executive",
    department: "Sales",
    location: "Whitefield",
    status: "Active",
    joinedAt: "Jun 15, 2025",
    assignedLeads: 23,
    siteVisits: 9,
  },
  {
    id: "EMP004",
    name: "Sneha Roy",
    email: "sneha@example.com",
    phone: "+91 87654 32109",
    role: "Sales Executive",
    department: "Sales",
    location: "Electronic City",
    status: "Inactive",
    joinedAt: "Aug 20, 2025",
    assignedLeads: 12,
    siteVisits: 5,
  },
  {
    id: "EMP005",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 91234 56789",
    role: "Team Leader",
    department: "Sales",
    location: "Bangalore",
    status: "Active",
    joinedAt: "Feb 10, 2024",
    assignedLeads: 32,
    siteVisits: 18,
  },
  {
    id: "EMP006",
    name: "Neha Sharma",
    email: "neha@example.com",
    phone: "+91 90123 45678",
    role: "Sales Executive",
    department: "Sales",
    location: "Sarjapur",
    status: "Active",
    joinedAt: "Oct 05, 2025",
    assignedLeads: 16,
    siteVisits: 8,
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  role: "Sales Executive",
  department: "Sales",
  location: "",
  status: "Active" as EmployeeStatus,
};

const filters = ["All Employees", "Active", "Inactive"] as const;

const statusStyles: Record<EmployeeStatus, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All Employees");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] =
    useState<string | null>(null);

  const [viewEmployee, setViewEmployee] =
    useState<Employee | null>(null);

  const [formData, setFormData] = useState(emptyForm);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: employees.length,
      active: employees.filter((e) => e.status === "Active").length,
      inactive: employees.filter((e) => e.status === "Inactive").length,
      leads: employees.reduce((sum, e) => sum + e.assignedLeads, 0),
    };
  }, [employees]);

  // Search and filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesFilter =
        activeFilter === "All Employees" ||
        employee.status === activeFilter;

      const query = search.toLowerCase();

      const matchesSearch =
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phone.toLowerCase().includes(query) ||
        employee.id.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [employees, activeFilter, search]);

  // Open add modal
  const openAddModal = () => {
    setEditingEmployeeId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (employee: Employee) => {
    setEditingEmployeeId(employee.id);

    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      department: employee.department,
      location: employee.location,
      status: employee.status,
    });

    setIsModalOpen(true);
  };

  // Save employee
  const handleSaveEmployee = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (editingEmployeeId) {
      setEmployees((current) =>
        current.map((employee) =>
          employee.id === editingEmployeeId
            ? { ...employee, ...formData }
            : employee
        )
      );
    } else {
      const newEmployee: Employee = {
        ...formData,
        id: `EMP${String(Date.now()).slice(-6)}`,
        joinedAt: new Date().toLocaleDateString("en-IN"),
        assignedLeads: 0,
        siteVisits: 0,
      };

      setEmployees((current) => [newEmployee, ...current]);
    }

    setIsModalOpen(false);
    setEditingEmployeeId(null);
    setFormData(emptyForm);
  };

  // Toggle employee status
  const toggleStatus = (id: string) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              status:
                employee.status === "Active" ? "Inactive" : "Active",
            }
          : employee
      )
    );
  };

  // Delete employee
  const deleteEmployee = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setEmployees((current) =>
      current.filter((employee) => employee.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Heading */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Employee Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team, employee details and sales assignments.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Employees"
            value={stats.total}
            icon={<Users size={19} />}
          />

          <StatCard
            label="Active Employees"
            value={stats.active}
            icon={<UserCheck size={19} />}
            color="text-green-600"
          />

          <StatCard
            label="Inactive Employees"
            value={stats.inactive}
            icon={<UserX size={19} />}
          />

          <StatCard
            label="Assigned Leads"
            value={stats.leads}
            icon={<BriefcaseBusiness size={19} />}
          />
        </div>

        {/* Employee Listing */}
        <div className="overflow-visible rounded-xl border border-gray-200 bg-white">

          {/* Toolbar */}
          <div className="border-b border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4">

              <div>
                <h2 className="font-semibold text-gray-900">
                  Manage Employees
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View, add and manage your organization&apos;s employees.
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
                    placeholder="Search by name, email, phone or employee ID..."
                    className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <button
                  onClick={openAddModal}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <Plus size={18} />
                  Add Employee
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

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-gray-50/80">
                <tr className="border-b border-gray-100">
                  {[
                    "Employee",
                    "Employee ID",
                    "Role",
                    "Contact",
                    "Assigned Leads",
                    "Site Visits",
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
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="transition hover:bg-gray-50/70"
                    >
                      {/* Employee */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                            {employee.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {employee.name}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {employee.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {employee.id}
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-800">
                          {employee.role}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {employee.department}
                        </p>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-700">
                          {employee.email}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {employee.phone}
                        </p>
                      </td>

                      {/* Leads */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">
                        {employee.assignedLeads}
                      </td>

                      {/* Site Visits */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">
                        {employee.siteVisits}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${statusStyles[employee.status]}`}
                        >
                          {employee.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <details className="group/menu relative">
                          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
                            <MoreVertical size={19} />
                          </summary>

                          <div className="absolute right-0 top-10 z-30 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">

                            <button
                              onClick={() => setViewEmployee(employee)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Eye size={15} />
                              View Details
                            </button>

                            <button
                              onClick={() => openEditModal(employee)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              <Pencil size={15} />
                              Edit Employee
                            </button>

                            <button
                              onClick={() => toggleStatus(employee.id)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                            >
                              {employee.status === "Active" ? (
                                <>
                                  <UserX size={15} />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck size={15} />
                                  Activate
                                </>
                              )}
                            </button>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              onClick={() => deleteEmployee(employee.id)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                              Delete Employee
                            </button>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <Users
                        size={28}
                        className="mx-auto mb-3 text-gray-300"
                      />
                      <p className="font-medium text-gray-900">
                        No employees found
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
              Showing {filteredEmployees.length} of {employees.length} employees
            </p>
          </div>
        </div>
      </div>

      {/* ADD / EDIT EMPLOYEE MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingEmployeeId
                    ? "Edit Employee"
                    : "Add New Employee"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingEmployeeId
                    ? "Update employee information."
                    : "Add a new member to your sales team."}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              id="employee-form"
              onSubmit={handleSaveEmployee}
              className="flex-1 space-y-5 overflow-y-auto p-6"
            >
              {/* Personal Information */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <FormField label="Full Name" required>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter employee name"
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
                        placeholder="employee@example.com"
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

                  <FormField label="Work Location">
                    <input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: e.target.value,
                        })
                      }
                      placeholder="e.g. Bangalore"
                      className="form-input"
                    />
                  </FormField>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Employment Information */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Employment Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Employee Role">
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value,
                        })
                      }
                      className="form-input bg-white"
                    >
                      <option>Sales Executive</option>
                      <option>Sales Manager</option>
                      <option>Team Leader</option>
                      <option>Property Consultant</option>
                      <option>Site Visit Coordinator</option>
                    </select>
                  </FormField>

                  <FormField label="Department">
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          department: e.target.value,
                        })
                      }
                      className="form-input bg-white"
                    >
                      <option>Sales</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                      <option>Customer Support</option>
                    </select>
                  </FormField>
                </div>

                <div className="mt-4">
                  <FormField label="Employee Status">
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as EmployeeStatus,
                        })
                      }
                      className="form-input bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </FormField>
                </div>
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
                form="employee-form"
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editingEmployeeId ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW EMPLOYEE MODAL */}
      {viewEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setViewEmployee(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold">
                  {viewEmployee.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    {viewEmployee.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {viewEmployee.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewEmployee(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-5">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[viewEmployee.status]}`}
              >
                {viewEmployee.status}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <DetailRow
                icon={<BriefcaseBusiness size={17} />}
                label="Employee ID"
                value={viewEmployee.id}
              />
              <DetailRow
                icon={<Mail size={17} />}
                label="Email"
                value={viewEmployee.email}
              />
              <DetailRow
                icon={<Phone size={17} />}
                label="Phone"
                value={viewEmployee.phone}
              />
              <DetailRow
                icon={<MapPin size={17} />}
                label="Location"
                value={viewEmployee.location}
              />
              <DetailRow
                icon={<CalendarDays size={17} />}
                label="Joined"
                value={viewEmployee.joinedAt}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Assigned Leads</p>
                <p className="mt-1 text-2xl font-semibold">
                  {viewEmployee.assignedLeads}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Site Visits</p>
                <p className="mt-1 text-2xl font-semibold">
                  {viewEmployee.siteVisits}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                openEditModal(viewEmployee);
                setViewEmployee(null);
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Pencil size={16} />
              Edit Employee
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
      <div className="flex items-center justify-between">
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

// Reusable Form Field
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

// Employee Details Row
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
