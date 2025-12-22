import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Countdown from "./Countdown";

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-trade-fair');
  const eventDate = "2026-02-06T00:00:00";

  return (
    <section className="relative w-full h-[75vh] min-h-[600px] flex items-center justify-center text-white text-center overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-primary/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="bg-background/80 text-foreground backdrop-blur-sm rounded-full px-4 py-1 mb-4 text-sm font-medium border border-foreground/20">
          <span className="font-bold text-black dark:text-white">February 6–15, 2026</span> • Kaduna Trade Fair Complex
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          47th Kaduna International Trade Fair
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
          The largest business event in Northern Nigeria. This is your organisation’s opportunity to secure unmatched visibility, brand power, and commercial influence.
        </p>
        <Countdown targetDate={eventDate} />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://trade-fair-ng.web.app/">
            <Button size="lg">
              Get Ticket
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="bg-transparent border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
