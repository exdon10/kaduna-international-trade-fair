import Image from "next/image";

type GalleryProps = {
  images: string[];
};

export default function GalleryGrid({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="relative h-40 w-full overflow-hidden rounded-lg"
        >
          <Image
            src={img}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      ))}
    </div>
  );
}
