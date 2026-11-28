-- CreateEnum
CREATE TYPE "Status" AS ENUM ('New', 'Contacted', 'Converted', 'SiteVisitRequest', 'Closed');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "SiteVisitStatus" AS ENUM ('Pending', 'Confirm', 'Completed', 'Rescheduled', 'Cancelled');

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'New',
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "enquiryId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "status" "EmployeeStatus" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteVisitRequest" (
    "id" TEXT NOT NULL,
    "status" "SiteVisitStatus" NOT NULL DEFAULT 'Pending',
    "scheduleTime" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "SiteVisitRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enquiry_propertyId_key" ON "Enquiry"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "SiteVisitRequest_propertyId_key" ON "SiteVisitRequest"("propertyId");

-- AddForeignKey
ALTER TABLE "Enquiry" ADD CONSTRAINT "Enquiry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteVisitRequest" ADD CONSTRAINT "SiteVisitRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteVisitRequest" ADD CONSTRAINT "SiteVisitRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
