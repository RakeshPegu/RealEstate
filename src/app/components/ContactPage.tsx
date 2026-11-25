import { Button } from "@/app/components/ui/button";

export default function ContactPage(){
    return(
        <section className="h-full flex flex-col gap-30 mb-100" >
         <div className="bg-amber-200 w-full relative">
            <img src={'/about.jpg'} alt="villa picture" className="h-[90vh] w-full object-fill z-0 "/>
            <div className="z-10 absolute top-0 bg-transparent backdrop-brightness-80 h-[90vh] w-full">
                <div className="absolute top-40 md:pl-20 flex flex-col md:gap-10">
                <h3 className="font-bold text-white text-6xl w-sm ">Let's Talk About Your Dream Home</h3>
                <p className="text-xl text-white w-xl" >
                    What does your dream home look like ? Cosy and Charming , spacious and modern or something entirely different ?
                </p>
              </div>
            </div>
         </div>
         <div className="flex flex-col gap-30" id="contact">
            <h3 className="font-sans text-3xl  text-center">Your Guide to Find Your Dream Home</h3>


            <div className="flex flex-row justify-evenly">
                <div className="font-sans flex flex-col gap-6">
                    <h3 className="text-xl ">Online Enquiry</h3>
                    <p className="w-2xs">The quiest and easiest way to reach us! Fill out the secure online form and tell us about your dream home, We will get back to you within 24 hours</p>
                    <Button className="rounded-[30px] py-6">Get in Touch</Button>
                </div>
                <div className="border-l-2"/>
                <div className="font-sans flex flex-col gap-6">
                    <h3 className="text-xl">Call Us</h3>
                    <p className="w-2xs">The quiest and easiest way to reach us! Fill out the secure online form and tell us about your dream home, We will get back to you within 24 hours</p>
                    <Button className="rounded-[30px] py-6 "> Call Us</Button>
                </div>
                <div className="border-l-2 "/>
                <div className="font-sans flex flex-col gap-6">
                    <h3 className="text-xl">Write to US</h3>
                    <p className="w-2xs">The quiest and easiest way to reach us! Fill out the secure online form and tell us about your dream home, We will get back to you within 24 hours</p>
                    <Button className="rounded-[30px] py-6">Write to Us</Button>
                </div>
            </div>
         </div>
 
        </section>
    )
}