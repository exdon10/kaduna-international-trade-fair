import LeaderCard from "@/components/leadership/LeaderCard";
import GalleryGrid from "@/components/leadership/GalleryGrid";
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const leaders = [
  {
    name: "John Doe",
    position: "President",
    image: "/leadership/leader1.jpg",
  },
  {
    name: "Amina Bello",
    position: "Vice President",
    image: "/leadership/leader2.jpg",
  },
  {
    name: "Samuel Yusuf",
    position: "Secretary",
    image: "/leadership/leader3.jpg",
  },
  {
    name: "Fatima Musa",
    position: "Treasurer",
    image: "/leadership/leader4.jpg",
  },
  {
    name: "Ibrahim Lawal",
    position: "Public Relations Officer",
    image: "/leadership/leader5.jpg",
  },
];

const galleryImages = [
  "/leadership/gallery/1.jpeg",
  "/leadership/gallery/2.jpeg",
  "/leadership/gallery/3.jpeg",
  "/leadership/gallery/4.jpeg",
  "/leadership/gallery/5.jpeg",
  "/leadership/gallery/6.jpeg",
  // add as many as you want
];

export default function LeadershipPage() {
  return (
    <div className="flex min-h-screen flex-col">
                  <Header />
    <main className="container max-w-7xl py-16 space-y-20">

      

      {/* Gallery Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Gallery
        </h2>

        <GalleryGrid images={galleryImages} />
      </section>

    </main>
    <Footer />
            </div>
  );
}
