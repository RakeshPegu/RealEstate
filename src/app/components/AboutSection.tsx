"use client";
import { Button } from "@/app/components/ui/button";
import React from "react";

export default function AboutSection() {
  return (
    <section className="flex flex-row h-screen m-20" id="about">
      <div className="flex-2/3 flex flex-col h-full  pb-20 md:pl-20 ">
        <div className="h-full mt-30 ">
        <h2 className="pl-40">About Us</h2>
        <h3 className="font-semibold text-[60px] w-xl">Homes worth staying in</h3>
        <h3 className="text-[50px] font-mono">For a long time</h3>
        <div className="w-xl  flex flex-col gap-10 mt-10">
            <p className="text-[20px]">
              each one chosen in a neighborhood we know well and visited in person before it reaches to this page
            </p>


            <Button className="w-md h-12 bg-transparent text-black ring-1">
              Browse Residency →
            </Button>
        </div>       
        </div>    
        <div className="border-b mt-10 border-gray-500 w-[90%] "/>

        <div className="flex flex-row justify-start md:gap-50 pt-10 pl-10">
          <div className="font-semibold flex flex-col items-center">
            <h4> 124</h4>
            <span> Residency</span>
          </div>
          <div className="font-semibold flex flex-col justify-center items-center">
            <h4> 54</h4>
            <span> Cities</span>
          </div>
          
        </div>
        </div>

      <div className="flex-1/3 flex flex-col items-center mt-25">
        <img src={'/about.jpg'} alt="properties photo" className="w-[400px] h-[80vh]  rounded-[30%]"/>
      </div>
      
    </section>
  );
}

