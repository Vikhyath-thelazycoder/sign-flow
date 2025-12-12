import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PosterCards from "@/components/PosterCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PosterCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
