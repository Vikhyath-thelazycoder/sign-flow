import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PosterCards from "@/components/PosterCards";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PosterCards />
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
