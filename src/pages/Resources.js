
// import React, { useState } from 'react';
// import { Download, ExternalLink, Book, Video, FileText, Code, Search, Filter } from 'lucide-react';

// const Resources = () => {
//   const [selectedType, setSelectedType] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   const resourceTypes = [
//     { id: 'all', label: 'All Resources', icon: <Book className="w-4 h-4" /> },
//     { id: 'tutorials', label: 'Tutorials', icon: <Video className="w-4 h-4" /> },
//     { id: 'documentation', label: 'Documentation', icon: <FileText className="w-4 h-4" /> },
//     { id: 'code', label: 'Code Samples', icon: <Code className="w-4 h-4" /> },
//     { id: 'templates', label: 'Templates', icon: <Download className="w-4 h-4" /> }
//   ];

//   const resources = [
//     {
//       id: 1,
//       title: "React Hooks Complete Guide",
//       description: "Comprehensive guide covering all React hooks with practical examples and best practices.",
//       type: "tutorials",
//       category: "React",
//       format: "PDF",
//       size: "2.5 MB",
//       downloads: 15420,
//       image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: true
//     },
//     {
//       id: 2,
//       title: "JavaScript ES6+ Cheat Sheet",
//       description: "Quick reference for modern JavaScript features including arrow functions, destructuring, and more.",
//       type: "documentation",
//       category: "JavaScript",
//       format: "PDF",
//       size: "1.2 MB",
//       downloads: 23150,
//       image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: true
//     },
//     {
//       id: 3,
//       title: "Node.js API Starter Template",
//       description: "Production-ready Node.js API template with authentication, validation, and testing setup.",
//       type: "templates",
//       category: "Node.js",
//       format: "ZIP",
//       size: "5.8 MB",
//       downloads: 8960,
//       image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: false
//     },
//     {
//       id: 4,
//       title: "Python Data Analysis Examples",
//       description: "Collection of Jupyter notebooks demonstrating data analysis techniques with pandas and matplotlib.",
//       type: "code",
//       category: "Python",
//       format: "ZIP",
//       size: "12.3 MB",
//       downloads: 11280,
//       image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: false
//     },
//     {
//       id: 5,
//       title: "CSS Grid Layout Masterclass",
//       description: "Step-by-step video tutorial series on mastering CSS Grid with real-world projects.",
//       type: "tutorials",
//       category: "CSS",
//       format: "Video",
//       size: "450 MB",
//       downloads: 19750,
//       image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: true
//     },
//     {
//       id: 6,
//       title: "Vue.js Component Library",
//       description: "Reusable Vue.js components with documentation and examples for rapid development.",
//       type: "code",
//       category: "Vue.js",
//       format: "ZIP",
//       size: "3.7 MB",
//       downloads: 6840,
//       image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: false
//     },
//     {
//       id: 7,
//       title: "MongoDB Schema Design Guide",
//       description: "Best practices for designing MongoDB schemas with performance optimization tips.",
//       type: "documentation",
//       category: "MongoDB",
//       format: "PDF",
//       size: "3.1 MB",
//       downloads: 9560,
//       image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: false
//     },
//     {
//       id: 8,
//       title: "React Native Mobile UI Kit",
//       description: "Complete mobile UI kit with 50+ screens and components for React Native apps.",
//       type: "templates",
//       category: "React Native",
//       format: "ZIP",
//       size: "25.4 MB",
//       downloads: 4320,
//       image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
//       featured: true
//     }
//   ];

//   const filteredResources = resources.filter(resource => {
//     const matchesType = selectedType === 'all' || resource.type === selectedType;
//     const matchesSearch =
//       resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resource.category.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesType && matchesSearch;
//   });

//   const featuredResources = resources.filter(resource => resource.featured);

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//             Learning Resources & Downloads
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Access our comprehensive collection of tutorials, documentation, code samples, and templates to accelerate your learning journey.
//           </p>
//         </div>

//         {/* Featured */}
//         <div className="mb-16">
//           <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Resources</h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredResources.map(resource => (
//               <div key={resource.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
//                 <div className="relative h-32 overflow-hidden">
//                   <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
//                   <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
//                     Featured
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h4 className="font-semibold text-gray-900 mb-1 text-sm">{resource.title}</h4>
//                   <p className="text-xs text-gray-600 mb-2 line-clamp-2">{resource.description}</p>
//                   <div className="flex items-center justify-between text-xs text-gray-500">
//                     <span>{resource.category}</span>
//                     <span>{resource.downloads.toLocaleString()} downloads</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Search & Filter */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search resources..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             <div className="flex items-center space-x-2">
//               <Filter className="w-5 h-5 text-gray-400" />
//               <div className="flex flex-wrap gap-2">
//                 {resourceTypes.map(type => (
//                   <button
//                     key={type.id}
//                     onClick={() => setSelectedType(type.id)}
//                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                       selectedType === type.id
//                         ? 'bg-blue-600 text-white shadow-md'
//                         : 'bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//                     }`}
//                   >
//                     {type.icon}
//                     <span className="text-sm">{type.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Resources Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredResources.map(resource => (
//             <div key={resource.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
//               <div className="relative h-48 overflow-hidden">
//                 <img src={resource.image} alt={resource.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
//                 <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg">
//                   <span className="text-sm font-medium text-gray-700">{resource.category}</span>
//                 </div>
//                 {resource.featured && (
//                   <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
//                     Featured
//                   </div>
//                 )}
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
//                   {resource.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
//                 <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
//                   <div className="flex items-center space-x-4">
//                     <span>{resource.format}</span>
//                     <span>•</span>
//                     <span>{resource.size}</span>
//                   </div>
//                   <span>{resource.downloads.toLocaleString()} downloads</span>
//                 </div>
//                 <div className="flex space-x-3">
//                   <button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
//                     <Download className="w-4 h-4" />
//                     <span>Download</span>
//                   </button>
//                   <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
//                     <ExternalLink className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats */}
//         <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
//           <div className="grid md:grid-cols-4 gap-6 text-center">
//             <div>
//               <div className="text-3xl font-bold mb-2">200+</div>
//               <div className="text-blue-100">Resources</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold mb-2">500K+</div>
//               <div className="text-blue-100">Downloads</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold mb-2">50+</div>
//               <div className="text-blue-100">Technologies</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold mb-2">Weekly</div>
//               <div className="text-blue-100">New Additions</div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Resources;






import { useState, useEffect, useRef, useCallback } from "react";
import resourceJson from "../data/resources.json";

export default function DomainFilterPage() {
  const resourceData = resourceJson.resourceData;
  const resources = resourceJson.resources;

  const [selectedDomain, setSelectedDomain] = useState("AI");
  const [selectedSubdomain, setSelectedSubdomain] = useState("Deep Learning");
  const [filteredResources, setFilteredResources] = useState([]);
  const [showSubdomainDropdown, setShowSubdomainDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Wrap applyFilter in useCallback to avoid ESLint warning
  const applyFilter = useCallback(() => {
    const result = resources.filter(
      (res) =>
        res.domain === selectedDomain && res.subdomain === selectedSubdomain
    );
    setFilteredResources(result);
  }, [resources, selectedDomain, selectedSubdomain]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSubdomainDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Automatically filter initially
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Filter Resources</h1>

      {/* Filter Section */}
      <div
        className="sticky top-4 bg-white dark:bg-gray-800 shadow rounded p-4 mb-6 text-black dark:text-white flex gap-6 flex-wrap z-10"
        ref={dropdownRef}
      >
        <div className="relative w-full sm:w-64 min-w-[16rem]">
          <label className="block font-semibold mb-1">Select Domain</label>
          <select
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value);
              setSelectedSubdomain("");
              setShowSubdomainDropdown(false);
            }}
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">-- Choose Domain --</option>
            {Object.keys(resourceData).map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {selectedDomain && (
          <div className="relative w-full sm:w-64 min-w-[16rem]">
            <label className="block font-semibold mb-1">Select Subdomain</label>
            <button
              onClick={() => setShowSubdomainDropdown((prev) => !prev)}
              className="w-full px-4 py-2 border rounded text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white border-gray-300 dark:border-gray-600"
            >
              {selectedSubdomain || "-- Choose Subdomain --"}
            </button>
            {showSubdomainDropdown && (
              <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-30 p-3 max-h-48 overflow-y-auto">
                {resourceData[selectedDomain].map((subdomain) => (
                  <label
                    key={subdomain}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
                  >
                    <input
                      type="radio"
                      name="subdomain"
                      value={subdomain}
                      checked={selectedSubdomain === subdomain}
                      onChange={() => {
                        setSelectedSubdomain(subdomain);
                        setShowSubdomainDropdown(false);
                      }}
                      className="form-radio text-blue-600 dark:text-blue-400"
                    />
                    <span>{subdomain}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-end">
          <button
            onClick={applyFilter}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Filtered Resources Display */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Filtered Resources</h2>
        {filteredResources.length === 0 ? (
          <p className="text-gray-500">
            No resources found. Select filters and click apply.
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredResources.map((res, index) => (
              <li key={index} className="border p-4 rounded shadow">
                <h3 className="text-lg font-bold">{res.title}</h3>
                <p className="text-sm text-gray-600">
                  {res.domain} / {res.subdomain}
                </p>
                <p className="mt-2 text-gray-500">{res.description}</p>
                <div className="mt-2">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-block"
                  >
                    Content Link
                  </a>

                    <span className="ml-2 text-sm text-gray-600 dark:text-neutral-400">
                      —
                      <a
                        href={"https://www.linkedin.com/in/rajpatel2619/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline ml-1"
                      >
                        Shared by Raj
                      </a>
                    </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
