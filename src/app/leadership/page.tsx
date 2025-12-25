import LeaderCard from "@/components/leadership/LeaderCard";
import GalleryGrid from "@/components/leadership/GalleryGrid";
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const leaders = [
  {
    name: "ALH MUHAMMADU MUNIR JA'AFARU mni  OFR MADAKIN ZAZZAU ",
    position: "PATRON AND CHAIRMAN BOT",
    image: "/leadership/leader1.jpeg",
  },
  {
    name: "ALH. FARUK SULEIMAN",
    position: "PRESIDENT",
    image: "/leadership/leader2.jpeg",
  },
  {
    name: "ALH. TIJJANI MUSA",
    position: "1st DEPUTY PRESIDENT",
    image: "/leadership/leader3.jpg",
  },
  {
    name: "ALH. SAIDU JALLO",
    position: "2nd DEPUTY PRESIDENT",
    image: "/leadership/leader4.jpeg",
  },
  {
    name: "DR. USMAN GARBA SAULAWA",
    position: "DIRECTOR GENERAL",
    image: "/leadership/leader5.jpeg",
  },
];

const galleryImages = [
  "/leadership/gallery/img1.jpg",
  "/leadership/gallery/img2.jpg",
  "/leadership/gallery/img3.jpg",
  // add as many as you want
];

export default function LeadershipPage() {
  return (
    <div className="flex min-h-screen flex-col">
          <Header />
    <main className="container max-w-7xl py-16 space-y-20">
     
      {/* Leadership Section */}
      <section>
        <h1 className="text-3xl font-bold text-center mb-12">
          Our Leaders
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} {...leader} />
          ))}
        </div>
      </section>

     

    </main>
    <Footer />
        </div>
  );
}
