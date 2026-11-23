import { redirect } from "next/navigation";
import { Suspense } from "react";

export const instant = false;

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const { auth } = await import("@clerk/nextjs/server");
  const authResult = await auth();
  console.log("Dashboard auth result:", authResult);
  const { userId } = authResult;

  if (!userId) {
    redirect("/signin");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">You are signed in as user {userId}.</p>
    </main>
  );
}


