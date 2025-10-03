import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[2/1] bg-gray-200 rounded-xl flex items-center justify-center">
        <div className="text-gray-400">No images available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 h-[400px] rounded-xl overflow-hidden">
      <div className="col-span-2 row-span-2 relative">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
      {images.slice(1, 5).map((image, index) => (
        <div key={index + 1} className="relative">
          <Image
            src={image}
            alt={`${title} - ${index + 2}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
