
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import brangLogo from '../../../public/zenit.png'
import {
  LayoutDashboard,
  ClipboardList,
  ChartNoAxesCombined,
  Settings,
  UserRound ,
  House,
  FileUser
} from "lucide-react";

const links = [
  { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { name: "Manage Enquiries", href: "/admin/enquiry", icon: ClipboardList },
  { name: "Manage Properties", href: "/admin/properties", icon: House },
  {name:"Manage Employee", href:"/admin/employee", icon:UserRound},
  {name:"Site Visit Request", href:"/admin/sitevisit", icon: FileUser},
  { name: "Reports", href: "/admin/reports", icon: ChartNoAxesCombined },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed flex h-full min-h-0 w-64 shrink-0 flex-col border-r border-stone-200 bg-[#fafaf8]">
      {/* Brand */}
      <div className="flex h-[88px] shrink-0 items-center border-b border-stone-200 px-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={brangLogo} alt="brandlogo" width={200} height={200} />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
          Workspace
        </p>

        <div className="space-y-1">
          {links.map(({ name, href, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-10 items-center font-sans gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className={`shrink-0 ${
                    active ? "text-green-400" : "text-stone-400"
                  }`}
                />
                <span className="min-w-0 flex-1">{name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="shrink-0 border-t border-stone-200 p-3">
        <div className="flex min-w-0 items-center gap-3 px-2 py-3">

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-stone-900">
              Rakesh Pegu
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              Administrator
            </p>
          </div>
        </div>

       </div>
    </aside>
  );
}
