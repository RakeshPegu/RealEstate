import AboutSection from "../components/AboutSection";
import ContactPage from "../components/ContactPage";
import FeaturedGrid from "../components/FeaturedGrid";
import HeroBanner from "../components/HeroBanner";


export const metadata = {
  title: "Real Estate Platform – Home",
  description: "Find your dream home among thousands of listings.",
  openGraph: {
    title: "Real Estate Platform – Home",
    description: "Find your dream home among thousands of listings.",
    url: "https://www.example.com/",
    site_name: "Real Estate Platform",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Hero background",
      },
    ],
  },
};
export const instant = false
export default function Home() {
  return (
    <>
      <HeroBanner />
      <AboutSection/>      
      <FeaturedGrid />
      <ContactPage/>
    </>
  );
}
