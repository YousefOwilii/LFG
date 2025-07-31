import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold mb-6 md:mb-0">
            <div className="relative w-8 h-8 mr-2">
              <Image 
                src="/images/projects/personal-logo.png" 
                alt="Yousef Owili" 
                fill 
                className="object-contain"
              />
            </div>
            <span>Yousef Owili</span>
          </Link>
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a 
              href="https://x.com/OwiliYousef" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Yousef Owili. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 