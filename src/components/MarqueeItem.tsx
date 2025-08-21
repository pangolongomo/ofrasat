import { motion } from "framer-motion";
import Image from "next/image";

interface MarqueeItemProps {
  images: {
    name: string;
    logo: string;
  }[];
  direction?: "rtl" | "ltr";
}

export default function MarqueeItem({
  images,
  direction = "rtl",
}: MarqueeItemProps) {
  const from = direction === "rtl" ? 0 : "-100%";
  const to = direction === "rtl" ? "-100%" : 0;

  return (
    <div className="flex my-8">
      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index: number) => {
          return (
            <Image
              width={200}
              height={200}
              alt={`${image.name}${index}`}
              className="h-16 w-auto object-contain pr-20"
              src={image.logo}
              key={index}
            />
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index: number) => {
          return (
            <Image
              width={200}
              height={200}
              alt={`${image.name}${index}`}
              className="h-16 w-auto object-contain pr-20"
              src={image.logo}
              key={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
