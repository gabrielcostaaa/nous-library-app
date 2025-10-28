import { BookCarousel } from "@/components/BookCarousel";
import { HeroSection } from "@/components/home/HeroSection";


export default function Home() {
  return (
    <div className="space-y-8">
      <HeroSection />
      <BookCarousel />
    </div>
  );
}
