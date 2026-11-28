
"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";

export default function HeroBanner() {
  const [activeTab, setActiveTab] = useState("Buy");

  const icons = [
    { href: "#", icon: FaLinkedin },
    { href: "#", icon: FaFacebook },
    { href: "#", icon: FaInstagram },
    { href: "#", icon: FaTwitter },
  ];

  return (
    <section
      className="bg-[url('/herobg.jpg')] h-[145vh] sm:h-[130vh] md:h-[110vh]  lg:h-[105vh]  relative  bg-center bg-cover min-h-screen flex flex-col items-center justify-center"
      id="home"
    >
      {/* Hero Content */}
      <div className="max-w-2xl px-4 absolute flex flex-col gap-10   top-40 md:gap-8 md:left-30">
        <h1 className="text-5xl md:text-6xl flex flex-col font-bold text-white leading-[1.3]">
          LET US FIND A PLACE YOU CAN CALL HOME
        </h1>

        <div className="flex flex-row gap-5 md:gap-10">
          <Link
            href="/#contact"
            className="bg-white/95 hover:bg-white/80 flex justify-center items-center rounded-full text-black h-12 px-4 text-xs sm:w-40"
          >
            Contact Us
          </Link>

          <Link
            href="/properties"
            className="bg-green-600 text-white flex justify-center items-center rounded-full h-12 text-xs px-4  hover:bg-green-400 sm:w-45"
          >
            Explore Properties
          </Link>
        </div>
      {/* Social Icons */}
    
        <div className="flex flex-row gap-10">
          {icons.map((item, index) => {
            const Icon = item.icon;

            return (
              <a href={item.href} key={index}>
                <Icon size={24} className="text-white hover:text-white transition" />
              </a>
            );
          })}
        </div>
      </div>



      {/* Property Search */}
      <div className="absolute bottom-0 lg:bottom-12 md:-translate-4 lg:translate-x-25 lg:translate-y-12 w-[95%] max-w-[850px]">

        {/* Search Tabs */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-brightness-60 backdrop-blur-xs backdrop-grayscale shadow-xl rounded-full w-fit p-2 mb-[-2px] relative z-10 ml-2">
          {["Buy", "Rent", "Off Plan"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 h-8 text-xs transition-all ${
                activeTab === tab
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-[#292929] text-white hover:bg-[#444]"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Search Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white/10 backdrop-blur-xl mb-4  rounded-[25px] p-5 md:px-8 md:py-5 flex flex-col md:flex-row items-center gap-5 md:gap-6 shadow-xl"
        >
          {/* Location */}
          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-white text-sm">Location</label>

            <div className="flex items-center gap-2 border border-white/50 rounded-full px-3 h-10 text-gray-400">
              <CiLocationOn size={20} />

              <input
                type="text"
                placeholder="Location"
                className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500"
              />

              <BiSolidDownArrow size={10} />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-white text-sm">Type</label>

            <div className="flex items-center gap-2 border border-white/50 rounded-full px-3 h-10 text-gray-400">
              <IoHomeOutline size={17} />

              <select className="bg-transparent outline-none w-full text-sm text-gray-400 appearance-none">
                <option className="bg-black">Villa</option>
                <option className="bg-black">Apartment</option>
                <option className="bg-black">House</option>
                <option className="bg-black">Commercial</option>
              </select>

              <BiSolidDownArrow size={10} />
            </div>
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2 flex-1 w-full">
            <label className="text-white text-sm">Price</label>

            <div className="flex items-center gap-2 border border-white/50 rounded-full px-3 h-10 text-gray-400">
              <BsCurrencyDollar size={16} />

              <select className="bg-transparent outline-none w-full text-sm text-gray-400 appearance-none">
                <option className="bg-black">Price Range</option>
                <option className="bg-black">Below 50 Lakh</option>
                <option className="bg-black">50 Lakh - 1 Crore</option>
                <option className="bg-black">1 Crore - 2 Crore</option>
                <option className="bg-black">Above 2 Crore</option>
              </select>

              <BiSolidDownArrow size={10} />
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto md:self-end">
            <Button
              type="submit"
              className="w-full md:w-[115px] h-10 rounded-full bg-[#f1dddd] hover:bg-white text-black text-xs"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
