import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';

const Mentors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  // Simulate data loading
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data with profile images and social links
      const mentorData = [
        {
          id: 1,
          name: "Abhinav Kumar",
          institution: "IT ISM Dhanbad",
          codeforcesRank: "Master @Codeforces(2i5l)",
          achievements: [
            "Rank 10 in ICPC Preliminary 2024-25",
            "2x under 2K Rank in Meta HackerCup"
          ],
          profileLink: "#",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          socialLinks: {
            linkedin: "#",
            codeforces: "#",
            twitter: "#"
          }
        },
        {
          id: 2,
          name: "Naman Kumar",
          institution: "IT ISM Dhanbad",
          codeforcesRank: "Master @Codeforces(2i29)",
          achievements: [
            "AIR 4 in ICPC 2025 Finals",
            "Global Rank 73 in CF Round 98!"
          ],
          profileLink: "#",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          socialLinks: {
            linkedin: "#",
            codeforces: "#",
            github: "#"
          }
        },
        {
          id: 3,
          name: "Pradyumn Kejriwal",
          institution: "IT Roorkee",
          codeforcesRank: "Master @Codeforces(2i05)",
          achievements: [
            "ICPC Asia West Finalist 2025",
            "IICPC 2024 Winner"
          ],
          profileLink: "#",
          image: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          socialLinks: {
            linkedin: "#",
            codeforces: "#",
            twitter: "#"
          }
        },
        {
          id: 4,
          name: "Gaurish Baliga",
          institution: "KJ Somniya College of Engineering, Vidyovihar",
          codeforcesRank: "Master @Codeforces(2i04)",
          achievements: [
            "ICPC Asia West Finalist"
          ],
          profileLink: "#",
          image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          socialLinks: {
            linkedin: "#",
            codeforces: "#",
            website: "#"
          }
        },
        {
          id: 5,
          name: "Akansh Khandelwal",
          institution: "IT Guwahati",
          codeforcesRank: "Candidate master @Codeforces(2055)",
          achievements: [
            "IICPC Winner in UG Category",
            "Global Rank 42 in CF Round 988"
          ],
          profileLink: "#",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          socialLinks: {
            linkedin: "#",
            codeforces: "#",
            github: "#"
          }
        },
        {
          id: 6,
          name: "Arihant Jain",
          institution: "IT Indore",
          codeforcesRank: "Candidate master @Codeforces(2014)",
          achievements: [
            "Rank 19 in ICPC Chennai Regionals",
            "Rank 39 in ICPC Amritapuri Regionals"
          ],
          profileLink: "#",
          image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
          socialLinks: {
            linkedin: "#",
            codeforces: "#",
            twitter: "#"
          }
        }
      ];
      
      setMentors(mentorData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
            Our Mentors
          </h1>
          
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-pulse"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full h-16 w-16 bg-gray-300 dark:bg-neutral-700"></div>
                    <div className="ml-4">
                      <div className="h-5 bg-gray-300 dark:bg-neutral-700 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-40"></div>
                    </div>
                  </div>
                  <div className="h-5 bg-gray-300 dark:bg-neutral-700 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-5/6"></div>
                  </div>
                  <div className="flex mt-6 space-x-4">
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-neutral-700"></div>
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-neutral-700"></div>
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-neutral-700"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual mentor cards
            mentors.map((mentor, index) => (
              <div 
                key={mentor.id} 
                className="bg-white dark:bg-neutral-800/70 rounded-xl shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/30 transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="rounded-full h-16 w-16 object-cover border-2 border-blue-500"
                    />
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{mentor.name}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.institution}</p>
                    </div>
                  </div>
                  
                  {/* <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg mb-4">
                    <p className="text-blue-700 dark:text-blue-300 font-semibold">{mentor.codeforcesRank}</p>
                  </div> */}
                  
                  <ul className="space-y-2 mb-6">
                    {mentor.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  
                  
                  <a 
                    href={mentor.profileLink} 
                    className="text-center flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors duration-300 w-full"
                  >
                    View Profile
                    <FiExternalLink className="ml-2 text-lg" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentors;