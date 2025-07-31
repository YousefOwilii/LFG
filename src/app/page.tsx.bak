import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";
import TypewriterEffect from "../components/TypewriterEffect";
import StylizedQuote from "../components/StylizedQuote";

// Project data
const projects = [
  {
    title: "This website",
    description: "This personal project showcases my skills in modern web development. Built with Next.js, TypeScript, and Tailwind CSS, it features a responsive design, dark mode, and interactive elements like the typewriter effect.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    projectUrl: "https://yousefowili.me",
    companyName: "Personal Project",
    imageUrl: "/images/projects/portfolio.jpg",
    companyLogo: "/images/projects/personal-logo.png",
  },
  {
    title: "Copywriting Services",
    description: "Worked with CopyLab to produce compelling copy for businesses and their websites. Created engaging content that drives conversions and improves brand messaging.",
    technologies: ["Copywriting", "Content Strategy", "SEO", "Brand Messaging"],
    projectUrl: "#",
    companyName: "CopyLab",
    imageUrl: "/images/projects/copylab.jpg",
    companyLogo: "/images/projects/copylab-logo.png",
  },
  {
    title: "AI Agents for Business",
    description: "Working with ForceAI to streamline AI agents for businesses. Our latest work focuses on creating lead generation and outreach agents that automate customer acquisition processes.",
    technologies: ["AI", "Python", "LangChain", "OpenAI API"],
    projectUrl: "#",
    companyName: "ForceAI",
    imageUrl: "/images/projects/forceai.jpg",
    companyLogo: "/images/projects/forceai-logo.png",
  },
  {
    title: "Media Production",
    description: "Collaborated with GMP (Generic Media Production) to produce video ads, restaurant menus, photo ad campaigns, and more. Created visually appealing content that effectively communicates brand messages.",
    technologies: ["Video Production", "Graphic Design", "Photography", "Adobe Suite"],
    projectUrl: "#",
    companyName: "GMP",
    imageUrl: "/images/projects/gmp.jpg",
    companyLogo: "/images/projects/gmp-logo.png",
  },
  {
    title: "Time Tracking App",
    description: "Currently working with Ease to develop 'Time', a mobile app that helps users track and budget their time throughout the day. The app features intuitive UI/UX and powerful time management tools.",
    technologies: ["SwiftUI", "iOS Development", "UI/UX Design", "Firebase"],
    projectUrl: "#",
    companyName: "Ease",
    imageUrl: "/images/projects/ease.jpg",
    companyLogo: "/images/projects/ease-logo.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Yousef Owili</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            <TypewriterEffect 
              strings={[
                "AI Agents Developer",
                "Copywriter",
                "Full Stack Developer",
                "SwiftUI App Developer",
                "Videographer"
              ]}
            />
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A jack of all trades can be a master of all.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Get in Touch
            </a>
            <a 
              href="#projects" 
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 text-gray-800 dark:text-white font-medium rounded-lg transition"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            About Me
          </h2>
          <div className="max-w-3xl mx-auto">
            <StylizedQuote>
              <p className="mb-4">
                My name is Yousef, the world calls me Owili.
              </p>
              <p className="mb-4">
                I'm currently studying computer science at the British University in Egypt, majoring in Artificial Intelligence. I always had this obsession of wanting to do "something". Something that is positively impactful in some regard. It all started at a young age seeing the dedication of some very hard working and talented people, and it made me tap into courses, videos, anything that can make me more like them. I worked on projects from web development, to creating copy and fascinations for small businesses, to designing graphic and creating content for local restaurants and gyms.
              </p>
              <p>
                I'm also that guy. The perfectionist, but at the same time, I don't let it negatively affect my progress. When I do things, I do them perfect and quick. I'm fast not sluggish. I completely and utterly honor my word, when I say something, I do it. A handshake, means a deal is a deal.
              </p>
            </StylizedQuote>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl font-bold mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl font-bold mb-2">20+</div>
              <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl font-bold mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 dark:text-blue-400 text-4xl font-bold mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-300">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            My Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                projectUrl={project.projectUrl}
                imageUrl={project.imageUrl}
                companyName={project.companyName}
                companyLogo={project.companyLogo}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="#" 
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 text-gray-800 dark:text-white font-medium rounded-lg transition"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Get In Touch
          </h2>
          
          <ContactForm />
          
          <div className="mt-16 flex justify-center">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">yousefowili_official@outlook.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
