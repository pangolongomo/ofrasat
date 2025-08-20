"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}

export default function ImageCarousel({
  images,
  className = "",
  imageClassName = "",
  children,
}: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        className={`w-full ${className}`}
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-[60vh]">
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1200}
                height={600}
                className={`w-full h-full object-cover ${imageClassName}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
