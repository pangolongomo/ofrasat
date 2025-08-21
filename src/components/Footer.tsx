import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} OFRASAT. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-white hover:text-blue-400 hover:scale-125 transition-colors"
            >
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-white hover:scale-125 transition-colors"
            >
              <FaXTwitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-pink-400 hover:scale-125 transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-blue-400 hover:scale-125 transition-colors"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-red-500 hover:scale-125 transition-colors"
            >
              <FaYoutube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
