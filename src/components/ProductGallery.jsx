import { useState } from "react";

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={selectedImage}
          alt="Product display"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`w-16 h-16 rounded border-2 ${
              selectedImage === image
                ? "border-green-500"
                : "border-transparent"
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
