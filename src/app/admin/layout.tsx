import React, { Suspense } from "react";
import Sidebar from "./sideBar";
export  default function DashboardLayout({children}: {children:React.ReactNode}){
    return(
            <div className="flex min-h-screen ">
            {/* Left sidebar */}
            <div className="flex-1/5">
            <Suspense>
              <Sidebar/>
            </Suspense>
            </div>
            {/* Right side */}
            <main className="flex-4/5 p-8 ">
            <Suspense>
                {children}
            </Suspense>
            </main>
        </div>
    )

}