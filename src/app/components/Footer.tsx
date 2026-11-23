import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {''} Real Estate Platform. All rights reserved.
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

