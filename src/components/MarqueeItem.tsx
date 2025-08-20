import { motion } from "framer-motion";
import Image from "next/image";

export default function MarqueeItem({
  images,
  from,
  to,
}: {
  images: {
    name: string;
    logo: string;
  }[];
  from: number | string;
  to: number | string;
}) {
  return (
    <div className="flex my-24">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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