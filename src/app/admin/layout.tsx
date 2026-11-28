
import React, { Suspense } from "react";
import Sidebar from "./sideBar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function ProtectedDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get logged-in user
  const user = await currentUser();

  // Check authentication
  if (!user) {
    redirect("/");
  }

  // Check admin role
  if (user.publicMetadata.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Left sidebar */}
      <div className="flex-1/5">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>

      {/* Right side */}
      <main className="flex-4/5 p-8">
        {children}
      </main>
    </div>
  );
}

export default function AdminDashboardLayout({children}:{children:React.ReactNode}){

    return(
        <Suspense fallback={<div>Loading dashboard...</div>}>
        <ProtectedDashboard>
            {children}
        </ProtectedDashboard>
        </Suspense>

    )
    
}
