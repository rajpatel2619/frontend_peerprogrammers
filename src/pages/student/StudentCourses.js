import React, { useEffect, useState } from "react";
import CourseCard from "../../components/home/CourseCard";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetch("/course_sample.json")
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((course) => {
          let validImage = course.cover_photo;
          if (
            !validImage ||
            validImage.includes("example.com/images") ||
            validImage.trim() === ""
          ) {
            const sampleImages = [
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
              "https://picsum.photos/400/200?random=5",
            ];
            validImage = sampleImages[course.id % sampleImages.length];
          }
          return { ...course, cover_photo: validImage };
        });
        setCourses(updatedData);
      })
      .catch((error) => console.error("Error loading courses:", error));
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === ""
        ? true
        : course.mode.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const uniqueFilteredCourses = Array.from(
    new Map(filteredCourses.map((course) => [course.id, course])).values()
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 pb-16 relative">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 mt-4 dark:text-white">
        Explore Our Popular Courses
      </h2>

      <div className="w-full max-w-4xl mx-auto mb-4 px-4">
        <input
          type="text"
          placeholder="Search Courses..."
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto mb-6 px-4">
        <label
          htmlFor="filterDropdown"
          className="block mb-1 text-sm ml-[2px] font-medium text-gray-900 dark:text-gray-300"
        >
          Filter Category
        </label>
        <div className="relative inline-block text-left w-40">
          <button
            id="filterDropdown"
            onClick={() => setShowFilter(!showFilter)}
            className="inline-flex justify-between w-full border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition"
          >
            {selectedCategory || "Select"}
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showFilter && (
            <div className="origin-top-left absolute left-0 w-40 md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20 rounded-md">
              <div className="py-1">
                {["Recorded", "Hybrid", "Live"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === mode ? "" : mode
                      );
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      selectedCategory === mode
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    } hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition`}
                  >
                    {mode}
                    {selectedCategory === mode && (
                      <span className="float-right text-blue-600 dark:text-white">
                        ✔
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {uniqueFilteredCourses.length > 0 ? (
        <div className="max-w-full mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4 md:px-6 lg:px-8">
          {uniqueFilteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col justify-between h-full"
              style={{ width: "100%" }}
            >
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                mode={course.mode}
                image={
                  course.cover_photo ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
          No courses found for the search term.
        </p>
      )}

      <p className="text-center text-gray-600 dark:text-gray-400 text-base max-w-3xl mx-auto mt-10 border-0 shadow-none">
        Browse through a wide selection of beginner to advanced courses designed
        to help you grow your skills. Whether you're starting out or looking to
        specialize, there's something for everyone.
        <a href="#" className="text-blue-600 font-medium hover:underline ml-1">
          Learn more
        </a>
      </p>
    </div>
  );
};

export default StudentCourses;
