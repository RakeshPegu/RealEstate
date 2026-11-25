
"use client";

import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Building2,
  MessageSquare,
  Users,
  CalendarCheck,
  IndianRupee,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Filter,
  BarChart3,
  PieChart,
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

const reportStats = [
  {
    title: "Total Enquiries",
    value: "326",
    change: "+18.2%",
    positive: true,
    description: "vs previous period",
    icon: MessageSquare,
  },
  {
    title: "Site Visits",
    value: "84",
    change: "+12.5%",
    positive: true,
    description: "vs previous period",
    icon: CalendarCheck,
  },
  {
    title: "Conversions",
    value: "21",
    change: "+5.4%",
    positive: true,
    description: "vs previous period",
    icon: Target,
  },
  {
    title: "Booking Value",
    value: "₹2.45 Cr",
    change: "+14.8%",
    positive: true,
    description: "vs previous period",
    icon: IndianRupee,
  },
];

const monthlyData = [
  { month: "Jan", enquiries: 42, visits: 18, conversions: 5 },
  { month: "Feb", enquiries: 55, visits: 24, conversions: 8 },
  { month: "Mar", enquiries: 48, visits: 21, conversions: 6 },
  { month: "Apr", enquiries: 68, visits: 30, conversions: 9 },
  { month: "May", enquiries: 75, visits: 35, conversions: 12 },
  { month: "Jun", enquiries: 88, visits: 42, conversions: 15 },
  { month: "Jul", enquiries: 72, visits: 34, conversions: 11 },
  { month: "Aug", enquiries: 95, visits: 48, conversions: 17 },
  { month: "Sep", enquiries: 84, visits: 39, conversions: 14 },
  { month: "Oct", enquiries: 110, visits: 55, conversions: 19 },
  { month: "Nov", enquiries: 125, visits: 62, conversions: 21 },
  { month: "Dec", enquiries: 0, visits: 0, conversions: 0 },
];

const sources = [
  { name: "Website", count: 142, percentage: 44, color: "bg-blue-500" },
  { name: "WhatsApp", count: 98, percentage: 30, color: "bg-emerald-500" },
  { name: "Property Portal", count: 56, percentage: 17, color: "bg-violet-500" },
  { name: "Direct / Other", count: 30, percentage: 9, color: "bg-amber-500" },
];

const propertyPerformance = [
  {
    name: "Green Valley Residency",
    location: "Whitefield, Bengaluru",
    enquiries: 86,
    visits: 32,
    bookings: 9,
    status: "Active",
  },
  {
    name: "Sunrise Heights",
    location: "Electronic City, Bengaluru",
    enquiries: 72,
    visits: 24,
    bookings: 6,
    status: "Active",
  },
  {
    name: "Urban Nest Villas",
    location: "Sarjapur Road, Bengaluru",
    enquiries: 58,
    visits: 18,
    bookings: 4,
    status: "Active",
  },
  {
    name: "Lakeview Apartments",
    location: "Hebbal, Bengaluru",
    enquiries: 35,
    visits: 10,
    bookings: 2,
    status: "Active",
  },
];

const employeePerformance = [
  {
    name: "Rahul Das",
    enquiries: 42,
    contacted: 38,
    visits: 18,
    conversions: 8,
    rate: "19.0%",
  },
  {
    name: "Neha Roy",
    enquiries: 36,
    contacted: 32,
    visits: 14,
    conversions: 6,
    rate: "16.7%",
  },
  {
    name: "Amit Kumar",
    enquiries: 29,
    contacted: 26,
    visits: 12,
    conversions: 5,
    rate: "17.2%",
  },
  {
    name: "Karan Singh",
    enquiries: 24,
    contacted: 19,
    visits: 8,
    conversions: 2,
    rate: "8.3%",
  },
];

const visitStats = [
  { label: "Scheduled", value: 84, color: "bg-blue-500" },
  { label: "Completed", value: 58, color: "bg-emerald-500" },
  { label: "Cancelled", value: 9, color: "bg-red-400" },
  { label: "Rescheduled", value: 17, color: "bg-amber-500" },
];

const bookingStats = [
  { label: "Total Bookings", value: "21" },
  { label: "Confirmed", value: "16" },
  { label: "Pending", value: "3" },
  { label: "Cancelled", value: "2" },
];

function StatCard({ item }: { item: (typeof reportStats)[number] }) {
  const Icon = item.icon;

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              {item.title}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              {item.value}
            </h3>
          </div>
          <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
            <Icon size={20} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="flex items-center font-semibold text-emerald-600">
            <ArrowUpRight size={14} />
            {item.change}
          </span>
          <span className="text-gray-400">{item.description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

export default function ReportsPage() {
  const [period, setPeriod] = useState("this-month");
  const [reportType, setReportType] = useState("all");
  const [property, setProperty] = useState("all");

  const maxValue = Math.max(
    ...monthlyData.map((item) => item.enquiries)
  );

  return (
    <div className="min-h-screen space-y-7 bg-gray-50/60 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BarChart3 size={15} />
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-gray-900">Reports</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your business performance and sales activities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="bg-white">
            <FileText size={16} className="mr-2" />
            PDF
          </Button>
          <Button className="bg-gray-900 text-white hover:bg-gray-800">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} />
            Filters
          </div>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-full bg-white md:w-[180px]">
              <CalendarDays size={15} className="mr-2 text-gray-500" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-full bg-white md:w-[180px]">
              <SelectValue placeholder="Report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="enquiries">Enquiries</SelectItem>
              <SelectItem value="visits">Site Visits</SelectItem>
              <SelectItem value="sales">Sales & Bookings</SelectItem>
              <SelectItem value="employees">Employees</SelectItem>
            </SelectContent>
          </Select>

          <Select value={property} onValueChange={setProperty}>
            <SelectTrigger className="w-full bg-white md:w-[220px]">
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="green-valley">Green Valley Residency</SelectItem>
              <SelectItem value="sunrise">Sunrise Heights</SelectItem>
              <SelectItem value="urban-nest">Urban Nest Villas</SelectItem>
              <SelectItem value="lakeview">Lakeview Apartments</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="md:ml-auto">
            Reset Filters
          </Button>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportStats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      {/* Enquiry chart and sources */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="border-gray-200 shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Enquiry & Sales Trends
            </CardTitle>
            <p className="text-sm text-gray-500">
              Monthly enquiries, site visits and conversions
            </p>
          </CardHeader>

          <CardContent>
            <div className="mb-5 flex flex-wrap gap-5 text-xs text-gray-600">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                Enquiries
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Site Visits
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Conversions
              </span>
            </div>

            <div className="flex h-64 items-end justify-between gap-2 border-b border-gray-100 pb-2">
              {monthlyData.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div
                      title={`${item.enquiries} enquiries`}
                      className="w-2.5 rounded-t-sm bg-gray-900 sm:w-4"
                      style={{
                        height: `${(item.enquiries / maxValue) * 85}%`,
                      }}
                    />
                    <div
                      title={`${item.visits} visits`}
                      className="w-2.5 rounded-t-sm bg-blue-500 sm:w-4"
                      style={{
                        height: `${(item.visits / maxValue) * 85}%`,
                      }}
                    />
                    <div
                      title={`${item.conversions} conversions`}
                      className="w-2.5 rounded-t-sm bg-emerald-500 sm:w-4"
                      style={{
                        height: `${(item.conversions / maxValue) * 85}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 sm:text-xs">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enquiry sources */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Enquiry Sources
            </CardTitle>
            <p className="text-sm text-gray-500">
              Where your customers find you
            </p>
          </CardHeader>

          <CardContent>
            <div className="mb-6 flex h-4 overflow-hidden rounded-full bg-gray-100">
              {sources.map((source) => (
                <div
                  key={source.name}
                  className={source.color}
                  style={{ width: `${source.percentage}%` }}
                />
              ))}
            </div>

            <div className="space-y-5">
              {sources.map((source) => (
                <div key={source.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${source.color}`} />
                      <span className="text-sm text-gray-600">
                        {source.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-900">
                        {source.count}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {source.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div
                      className={`h-1.5 rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site visit and booking reports */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Site Visit Performance
            </CardTitle>
            <p className="text-sm text-gray-500">
              Status of scheduled property visits
            </p>
          </CardHeader>

          <CardContent>
            <div className="mb-5 grid grid-cols-2 gap-3">
              {visitStats.map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-100 p-4">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex h-3 overflow-hidden rounded-full bg-gray-100">
              {visitStats.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{ width: `${(item.value / 168) * 100}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Distribution of all recorded visit requests
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Sales & Booking Summary
            </CardTitle>
            <p className="text-sm text-gray-500">
              Overview of property booking activity
            </p>
          </CardHeader>

          <CardContent>
            <div className="mb-5 rounded-xl bg-gray-900 p-5 text-white">
              <p className="text-sm text-gray-300">Total booking value</p>
              <p className="mt-2 text-3xl font-bold">₹2,45,00,000</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-emerald-300">
                <TrendingUp size={14} />
                14.8% increase from previous period
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {bookingStats.map((item) => (
                <div key={item.label}>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property performance */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Property Performance
          </CardTitle>
          <p className="text-sm text-gray-500">
            Compare enquiry interest and bookings across properties
          </p>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Enquiries</th>
                  <th className="px-4 py-3 font-medium">Site Visits</th>
                  <th className="px-4 py-3 font-medium">Bookings</th>
                  <th className="px-4 py-3 font-medium">Visit Rate</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {propertyPerformance.map((item) => (
                  <tr key={item.name} className="border-b last:border-0 hover:bg-gray-50/70">
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-400">{item.location}</p>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-700">
                      {item.enquiries}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{item.visits}</td>
                    <td className="px-4 py-4 font-semibold text-emerald-600">
                      {item.bookings}
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {((item.visits / item.enquiries) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-4">
                      <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee performance */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Employee Performance Report
          </CardTitle>
          <p className="text-sm text-gray-500">
            Compare employee enquiry handling and conversion performance
          </p>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-medium">Employee</th>
                  <th className="px-4 py-3 font-medium">Enquiries</th>
                  <th className="px-4 py-3 font-medium">Contacted</th>
                  <th className="px-4 py-3 font-medium">Site Visits</th>
                  <th className="px-4 py-3 font-medium">Conversions</th>
                  <th className="px-4 py-3 font-medium">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {employeePerformance.map((employee) => (
                  <tr key={employee.name} className="border-b last:border-0 hover:bg-gray-50/70">
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{employee.enquiries}</td>
                    <td className="px-4 py-4 text-gray-700">{employee.contacted}</td>
                    <td className="px-4 py-4 text-gray-700">{employee.visits}</td>
                    <td className="px-4 py-4 font-semibold text-emerald-600">
                      {employee.conversions}
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-gray-900">
                        {employee.rate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
        <Activity className="mt-0.5 shrink-0 text-blue-600" size={18} />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            About these reports
          </p>
          <p className="mt-1 text-sm text-gray-600">
            All figures shown are sample data for the dashboard preview.
            Actual reports should be calculated from enquiries, site visits,
            bookings and employee records within the selected date range.
          </p>
        </div>
      </div>
    </div>
  );
}
