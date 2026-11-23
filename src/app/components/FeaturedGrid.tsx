import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertiesCard from "../cards/propertiesCard";

type Property = {
  id: string;
  address: string;
  price: number;
  imageUrl: string;
  title?: string;
};

/**
 * FeaturedGrid – server component that fetches public property data and displays up to 12 cards.
//  * Uses the existing `/api/properties` endpoint (no auth required).
//  */
// export default async function FeaturedGrid() {
//   // Fetch properties from the public API. Revalidate every 60 seconds for fresh data.
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/properties`, {
//     next: { revalidate: 60 },
//   });
//   if (!res.ok) {
//     // In case the endpoint fails, render a friendly message.
//     return (
//       <section className="py-8">
//         <p className="text-center text-gray-600 dark:text-gray-400">
//           Unable to load featured properties at this time.
//         </p>
//       </section>
//     );
//   }

//   const data: { properties: Property[] } = await res.json();
//   const properties = data.properties.slice(0, 12);

//   return (
//     <section className="py-8 bg-gray-50 dark:bg-gray-900">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
//           Featured Listings
//         </h2>

       
//       </div>
//     </section>
//   );
// }
export default function FeaturedGrid(){

  return(
    <section className="flex flex-col h-screen items-center mt-30 gap-15" id="properties">
      <div className="flex flex-row w-[95%] justify-between">
        <div className="">
          <h2>our listing</h2>
          <p className="text-2xl">featured Properties</p>
        </div>
        <Link href={'/properties'} className="bg-green-600 px-8 md:h-[50px] rounded-[30px] flex justify-center items-center text-white" >view listing →</Link>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <PropertiesCard/>
        <PropertiesCard/>
        <PropertiesCard/>
        <PropertiesCard/>
        <PropertiesCard/>

      </div>
      <div className="flex flex-row justify-center">
        <Button className="bg-green-600 px-12 py-6">contact us →</Button>
      </div>

    </section>
    
  )
}
