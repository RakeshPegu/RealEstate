
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import brandLogo from "../../../public/zenit.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter()
  const [targetSection, setTargetSection] = useState<string | null>(null);

  const navLink = [
    {
      name: "Home",
      href: "/",
      id: "home",
    },
    {
      name: "About",
      href: "/#about",
      id: "about",
    },
    {
      name: "Properties",
      href: "/#properties",
      id: "properties",
    },
    {
      name: "Contact",
      href: "/#contact",
      id: "contact",
    },
  ];
  const handleLinkClick = (id:string)=>{
    console.log("this is our current page name", pathname)
    if(pathname === '/'){
      document.getElementById(id)?.scrollIntoView({behavior:"smooth"})

    }else{
      setTargetSection(id)
      router.push('/')
    }

    
  }
  useEffect(()=>{
    if(pathname === '/' && targetSection){
      const element = document.getElementById(targetSection)
      if(element){
        element.scrollIntoView({
          behavior:"smooth"
        })
        setTargetSection(null)
      }
    
    }

  }, [targetSection, pathname])
  return (
    <nav className="fixed top-4 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <img
              src={brandLogo.src}
              alt="Brand logo"
              width={150}
              height={150}
            />
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex">
            <ul className="flex gap-12">
              {navLink.map((link) => (
                <li key={link.id}
                    className="text-gray-900 cursor-pointer hover:text-green-700 dark:text-gray-300 transition-colors"
                    onClick={()=>handleLinkClick(link.id)}
                  >
                    {link.name}
        
                </li>
              ))}
            </ul>
          </div>

          {/* Authentication */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton>
                <button className="rounded bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                  Sign in
                </button>
              </SignInButton>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
