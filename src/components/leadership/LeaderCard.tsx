import Image from "next/image";

type LeaderProps = {
  name: string;
  position: string;
  image: string;
};

export default function LeaderCard({ name, position, image }: LeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-48 w-48 overflow-hidden ">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{name}</h3>
      <p className="text-sm text-muted-foreground">{position}</p>
    </div>
  );
}
