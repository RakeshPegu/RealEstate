import React from "react";

export default function TrustStrip() {
  return (
    <section className="bg-white py-6 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <li className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">$500M+</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">sales volume</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,200+</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">happy families</span>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">98%</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">customer satisfaction</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

