import { useState, useEffect } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import rajImage from '../assets/raj.webp';
import muzammilImage from '../assets/mak.jpg';
import arpitImage from '../assets/arpit.jpg';
import logo from '../assets/logo_black.png';
import amitphoto from '../assets/amit.jpeg';
import yatiImage from '../assets/yati.jpeg';
import shivaphoto from '../assets/shiva.jpeg';
import tanmayphoto from '../assets/tanmay.jpeg';


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
          id: 7,
          name: "Raj Patel",
          institution: "IIT Patna",
          codeforcesRank: "TBD",
          achievements: [
            "Mentor Peer Programmers",
            "Ex-SDE at Sopra Steria"
          ],
          profileLink: "#",
          image: rajImage,
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/rajpatel2619/",
            codeforces: "#",
            twitter: "#"
          }
        },
        {
          id: 8,
          name: "Muzammil Ahmad Karimi" ,
          institution: "IIT Patna",
          codeforcesRank: "TBD",
          achievements: [
            "Mentor Peer Programmers",
            "Aspiring Software Engineer"
          ],
          profileLink: "#",
          image: muzammilImage,
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/makarimi01/",
            codeforces: "#",
            github: "#"
          }
        },
        {
          id: 9,
          name: "Arpit Anand",
          institution: "IIT Patna",
          codeforcesRank: "TBD",
          achievements: [
            "M.Tech in Mathematics & Computing",
            "Machine Learning Enthusiast"
          ],
          profileLink: "#",
          image: arpitImage,
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/arpit-anand-b3656b1aa/",
            codeforces: "#",
            twitter: "#"
          }
        },
{
          id: 12,
          name: "Amit kumar yadav",
          institution: "IIT Guwahati",
          codeforcesRank: "TBD",
          achievements: [
            "Engineer at Micron",
            "M.Tech from IIT Guwahati"
          ],
          profileLink: "#",
          image: amitphoto,
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/amit-kumar-yadav-1b417b189/",
            codeforces: "#",
            twitter: "#"
          }
        },
        {
          id: 10,
          name: "Yatindra Deo",
          institution: "IIT Patna",
          codeforcesRank: "TBD",
          achievements: [
            "Competitive Programmer",
            "Top 10% in Leetcode"
          ],
          profileLink: "#",
          image: yatiImage,
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/yatindra-deo-0b383a202/",
            codeforces: "#",
            twitter: "#"
          }
        },
        {
          id: 13,
          name: "Shiva Gupta",
          institution: "IIT Patna",
          codeforcesRank: "TBD",
          achievements: [
            "Computer Scientist at BEL",
            "M.Tech from IIT Patna"
          ],
          profileLink: "#",
          image: shivaphoto,
          socialLinks: {
            linkedin: "https://www.linkedin.com/in/shiva-gupta-03234817a/",
            codeforces: "#",
            twitter: "#"
          }
        },
        
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
          <hr className="w-40 border-t-2  border-black dark:border-white mx-auto" />

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
                    href={mentor.socialLinks.linkedin}
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