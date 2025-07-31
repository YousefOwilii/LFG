'use client';

// Updated ProjectCard component with circular logos
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  companyLogo: string;
  companyName: string;
  technologies: string[];
  projectUrl: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  companyLogo,
  companyName,
  technologies,
  projectUrl,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Generate initials for placeholder
  const initials = companyName 
    ? companyName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg max-w-md mx-auto">
      <div className="relative h-48 w-full">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">{title}</span>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={200}
            className="object-cover w-full h-full"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative h-10 w-10 mr-3 flex-shrink-0">
            {logoError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
                <span className="text-xs text-gray-500 dark:text-gray-400">{companyName.charAt(0)}</span>
              </div>
            ) : (
              <Image
                src={companyLogo}
                alt={companyName}
                width={40}
                height={40}
                className="object-contain rounded-full"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{companyName}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
        
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <a 
          href={projectUrl}
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </div>
    </div>
  );
} 