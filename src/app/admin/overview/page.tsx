
"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Home,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Users,
  UserRound,
  TrendingUp,
  MapPin,
  Phone,
  Activity,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/app/components/ui/button";

const stats = [
  {
    title: "Total Properties",
    value: "48",
    change: "+12.5%",
    description: "Compared to last month",
    icon: Building2,
    trend: "up",
  },
  {
    title: "Total Enquiries",
    value: "326",
    change: "+18.2%",
    description: "Compared to last month",
    icon: MessageSquare,
    trend: "up",
  },
  {
    title: "Site Visits",
    value: "84",
    change: "+8.4%",
    description: "Compared to last month",
    icon: CalendarDays,
    trend: "up",
  },
  {
    title: "Sales Employees",
    value: "12",
    change: "2 new",
    description: "Added this month",
    icon: Users,
    trend: "neutral",
  },
];

const enquiryTrend = [
  { day: "Mon", enquiries: 32 },
  { day: "Tue", enquiries: 45 },
  { day: "Wed", enquiries: 38 },
  { day: "Thu", enquiries: 60 },
  { day: "Fri", enquiries: 48 },
  { day: "Sat", enquiries: 72 },
  { day: "Sun", enquiries: 55 },
];

const enquiryStatuses = [
  { label: "New", count: 48, color: "bg-blue-500", percentage: 30 },
  { label: "Contacted", count: 62, color: "bg-amber-500", percentage: 38 },
  { label: "Site Visit", count: 31, color: "bg-violet-500", percentage: 19 },
  { label: "Converted", count: 21, color: "bg-emerald-500", percentage: 13 },
];

const upcomingVisits = [
  {
    id: "SV-1024",
    customer: "Amit Sharma",
    property: "Green Valley Residency",
    date: "Today",
    time: "10:30 AM",
    status: "Confirmed",
    initials: "AS",
  },
  {
    id: "SV-1025",
    customer: "Priya Das",
    property: "Sunrise Heights",
    date: "Today",
    time: "12:00 PM",
    status: "Pending",
    initials: "PD",
  },
  {
    id: "SV-1026",
    customer: "Rahul Verma",
    property: "Urban Nest Villas",
    date: "Tomorrow",
    time: "11:00 AM",
    status: "Confirmed",
    initials: "RV",
  },
  {
    id: "SV-1027",
    customer: "Neha Kapoor",
    property: "Green Valley Residency",
    date: "Tomorrow",
    time: "02:30 PM",
    status: "Pending",
    initials: "NK",
  },
];

const recentEnquiries = [
  {
    id: "ENQ-2048",
    name: "Ankit Sharma",
    phone: "+91 98765 43210",
    property: "Green Valley Residency",
    source: "Website",
    assigned: "Rahul Das",
    status: "New",
    date: "Today, 09:42 AM",
  },
  {
    id: "ENQ-2047",
    name: "Priya Das",
    phone: "+91 91234 56789",
    property: "Sunrise Heights",
    source: "WhatsApp",
    assigned: "Neha Roy",
    status: "Contacted",
    date: "Today, 08:15 AM",
  },
  {
    id: "ENQ-2046",
    name: "Rahul Verma",
    phone: "+91 99887 66554",
    property: "Urban Nest Villas",
    source: "Property Portal",
    assigned: "Amit Kumar",
    status: "Site Visit",
    date: "Yesterday",
  },
  {
    id: "ENQ-2045",
    name: "Sneha Sharma",
    phone: "+91 87654 32109",
    property: "Green Valley Residency",
    source: "Website",
    assigned: "Rahul Das",
    status: "Converted",
    date: "Yesterday",
  },
];

const employees = [
  {
    name: "Rahul Das",
    role: "Senior Sales Executive",
    enquiries: 42,
    visits: 18,
    conversions: 8,
    initials: "RD",
  },
  {
    name: "Neha Roy",
    role: "Sales Executive",
    enquiries: 36,
    visits: 14,
    conversions: 6,
    initials: "NR",
  },
  {
    name: "Amit Kumar",
    role: "Sales Executive",
    enquiries: 29,
    visits: 12,
    conversions: 5,
    initials: "AK",
  },
];

const activities = [
  {
    title: "New enquiry received",
    detail: "Ankit Sharma enquired about Green Valley Residency",
    time: "10 minutes ago",
    icon: MessageSquare,
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Site visit confirmed",
    detail: "Amit Sharma's visit was confirmed",
    time: "35 minutes ago",
    icon: CalendarDays,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Property added",
    detail: "Sunrise Heights was added to the listings",
    time: "2 hours ago",
    icon: Building2,
    color: "text-violet-600 bg-violet-50",
  },
  {
    title: "Employee added",
    detail: "Karan Singh joined the sales team",
    time: "Yesterday",
    icon: UserRound,
    color: "text-amber-600 bg-amber-50",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-200",
    Contacted: "bg-amber-50 text-amber-700 border-amber-200",
    "Site Visit": "bg-violet-50 text-violet-700 border-violet-200",
    Converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${styles[status] || "bg-gray-50 text-gray-700"} font-medium`}
    >
      {status}
    </Badge>
  );
}

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export default function AdminOverviewPage() {
  const [period, setPeriod] = useState("7");

  const maxEnquiries = Math.max(
    ...enquiryTrend.map((item) => item.enquiries)
  );

  return (
    <div className="min-h-screen space-y-7 bg-gray-50/60 p-4 md:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Home size={15} />
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-gray-900">Overview</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your real estate business.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="bg-white">
            <FileText size={16} className="mr-2" />
            Reports
          </Button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800">
            <Plus size={16} className="mr-2" />
            Add Property
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-gray-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                      {stat.value}
                    </h3>
                  </div>
                  <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
                    <Icon size={21} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  {stat.trend === "up" ? (
                    <span className="flex items-center font-semibold text-emerald-600">
                      <ArrowUpRight size={14} />
                      {stat.change}
                    </span>
                  ) : (
                    <span className="font-semibold text-blue-600">
                      {stat.change}
                    </span>
                  )}
                  <span className="text-gray-400">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="border-gray-200 shadow-sm xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-semibold">
                Enquiry Overview
              </CardTitle>
              <p className="mt-1 text-sm text-gray-500">
                Track incoming enquiries over time
              </p>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[135px] bg-white">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>

          <CardContent>
            <div className="mb-6 flex items-end gap-3">
              <span className="text-3xl font-bold text-gray-900">350</span>
              <span className="mb-1 flex items-center text-sm font-medium text-emerald-600">
                <TrendingUp size={15} className="mr-1" />
                18.2%
              </span>
              <span className="mb-1 text-xs text-gray-400">
                vs previous period
              </span>
            </div>

            <div className="relative flex h-56 items-end justify-between gap-3 border-b border-gray-100 pb-2">
              {[0, 20, 40, 60, 80].map((value) => (
                <div
                  key={value}
                  className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-gray-100"
                  style={{ bottom: `${(value / 80) * 100}%` }}
                />
              ))}

              {enquiryTrend.map((item) => (
                <div
                  key={item.day}
                  className="relative z-10 flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-medium text-gray-500">
                    {item.enquiries}
                  </span>
                  <div
                    className="w-full max-w-[42px] rounded-t-md bg-gray-900 transition-all hover:bg-blue-600"
                    style={{
                      height: `${(item.enquiries / maxEnquiries) * 75}%`,
                    }}
                    title={`${item.enquiries} enquiries`}
                  />
                  <span className="text-xs text-gray-400">{item.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enquiry status */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Enquiry Status
            </CardTitle>
            <p className="text-sm text-gray-500">
              Current enquiry distribution
            </p>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900">162</p>
              <p className="mt-1 text-xs text-gray-400">
                Active enquiries
              </p>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-gray-100">
                {enquiryStatuses.map((item) => (
                  <div
                    key={item.label}
                    className={item.color}
                    style={{ width: `${item.percentage}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {enquiryStatuses.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div
                      className={`h-1.5 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming site visits */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Upcoming Site Visits
            </CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              Keep track of scheduled property visits
            </p>
          </div>
          <Button variant="outline" size="sm">
            View all <ArrowRight size={15} className="ml-2" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Visit Date</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingVisits.map((visit) => (
                  <tr key={visit.id} className="border-b last:border-0 hover:bg-gray-50/70">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                          {visit.initials}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {visit.customer}
                          </p>
                          <p className="text-xs text-gray-400">{visit.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {visit.property}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{visit.date}</td>
                    <td className="px-4 py-4 text-gray-600">{visit.time}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={visit.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye size={15} className="mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent enquiries */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Recent Enquiries
            </CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              Latest enquiries received from potential buyers
            </p>
          </div>
          <Button variant="outline" size="sm">
            View all <ArrowRight size={15} className="ml-2" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Assigned To</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-b last:border-0 hover:bg-gray-50/70">
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">
                        {enquiry.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {enquiry.phone}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {enquiry.property}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {enquiry.source}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {enquiry.assigned}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={enquiry.status} />
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500">
                      {enquiry.date}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={17} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee performance and activity */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Employee Performance
              </CardTitle>
              <p className="mt-1 text-sm text-gray-500">
                Sales team performance this month
              </p>
            </div>
            <Button variant="outline" size="sm">
              View team
            </Button>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[450px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs text-gray-500">
                    <th className="pb-3 font-medium">Employee</th>
                    <th className="pb-3 text-center font-medium">Enquiries</th>
                    <th className="pb-3 text-center font-medium">Visits</th>
                    <th className="pb-3 text-center font-medium">Deals</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.name} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold">
                            {employee.initials}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {employee.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {employee.role}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center font-medium text-gray-700">
                        {employee.enquiries}
                      </td>
                      <td className="text-center font-medium text-gray-700">
                        {employee.visits}
                      </td>
                      <td className="text-center font-semibold text-emerald-600">
                        {employee.conversions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Recent Activity
            </CardTitle>
            <p className="mt-1 text-sm text-gray-500">
              Latest updates across your platform
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.title} className="flex gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}
                    >
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {activity.detail}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
