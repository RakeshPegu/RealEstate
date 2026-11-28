
"use client";
import { Button } from "@/app/components/ui/button";
import React from "react";

export default function AboutSection() {
  return (
    <section className="flex flex-row justify-center h-screen w-full md:gap-10" id="about">
      <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-baseline h-full pb-20 lg:pl-10">
            <div className="h-full mt-30 px-4 md:px-0">
          <h2 className="pl-0 md:pl-40">About Us</h2>
          <h3 className="font-semibold text-2xl md:text-[60px] max-w-xl">
            Homes worth staying in
          </h3>
          <h3 className="text-3xl md:text-[50px] font-mono">
            For a long time
          </h3>

          <div className="max-w-xl flex flex-col gap-10 mt-10">
            <p className="text-[20px]">
              each one chosen in a neighborhood we know well and visited in
              person before it reaches to this page
            </p>

            <Button className="sm:w-md h-12 bg-transparent text-black ring-1">
              Browse Residency →
            </Button>
          </div>
        </div>

        <div className="border-b mt-10 border-gray-500 md:w-[90%]" />

        <div className="flex flex-row justify-center w-full lg:justify-start gap-20 sm:gap-50 pt-10 lg:pl-10">
          <div className="font-semibold flex flex-col items-center">
            <h4>124</h4>
            <span>Residency</span>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <h4>54</h4>
            <span>Cities</span>
          </div>
        </div>
      </div>

      <div className="flex-1/3 lg:flex flex-col items-center hidden mt-25">
        <img
          src="/about.jpg"
          alt="properties photo"
          className="w-[400px] min-w-[400px] h-[80vh] shrink-0 rounded-[30%]"
        />
      </div>
    </section>
  );
}
