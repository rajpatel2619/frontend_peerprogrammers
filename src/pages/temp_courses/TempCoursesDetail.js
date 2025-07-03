// CoursePage.js
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import courses from "./data/courses"; // adjust path
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const tagColors = { /* same tagColors mapping */ };

export default function TempCoursesDetail() {
    const tagColors = {
        AI: "bg-blue-500",
        Frontend: "bg-purple-500",
        Backend: "bg-orange-500",
        Fullstack: "bg-teal-500",
        Advanced: "bg-pink-500",
        Beginner: "bg-indigo-500",
        Intermediate: "bg-gray-500",
        SystemDesign: "bg-yellow-500",
        Bestseller: "bg-green-500",
        New: "bg-red-500",
        Free: "bg-lime-500",
      };
  const { slug } = useParams();

  const allCourses = Object.values(courses).flat();
  const course = allCourses.find((c) => c.slug === slug);

  if (!course) {
    // Redirect to 404 route (or custom component)
    return <Navigate to="/404" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-white space-y-10">
      {/* TITLE + DESCRIPTION */}
      <div className="bg-neutral-900 p-6 rounded-xl space-y-3">
        <div className="flex flex-wrap gap-2 mb-2">
        {course.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            tagColors[tag] || "bg-neutral-700 text-white"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
        </div>
        <h1 className="text-4xl font-bold">{course.title}</h1>
        <p className="text-neutral-300">{course.desc}</p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* RIGHT SIDEBAR */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 flex flex-col gap-6 max-h-[calc(100vh-5rem)]">
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <h2 className="text-2xl font-semibold mb-3">
              Instructor{Array.isArray(course.instructor) && course.instructor.length > 1 ? "s" : ""}
            </h2>

            {Array.isArray(course.instructor)
              ? course.instructor.map((inst, i) => (
                <div key={i} className="flex items-start gap-4 mb-6">
                  {inst.avatar && (
                    <img src={inst.avatar} alt={inst.name} width={60} height={60}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">{inst.name}</h3>
                    <p className="text-neutral-400 mt-1">{inst.bio}</p>
                    <div className="flex gap-4 mt-2">
                      {inst.linkedin && (
                        <a href={inst.linkedin} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
                        >
                          <FaLinkedin size={16} /> LinkedIn
                        </a>
                      )}
                      {/* {inst.portfolio && (
                        <a href={inst.portfolio} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
                        >
                          <FaGlobe size={16} /> Portfolio
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
              ))
              : (
                <div className="flex items-start gap-4 mb-6">
                  {course.instructor.avatar && (
                    <img src={course.instructor.avatar} alt={course.instructor.name}
                      className="rounded-full object-cover" width={60} height={60} />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl">{course.instructor.name}</h3>
                    <p className="text-neutral-400 mt-1">{course.instructor.bio}</p>
                    <div className="flex gap-4 mt-2">
                      {course.instructor.linkedin && (
                        <a href={course.instructor.linkedin} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
                        >
                          <FaLinkedin size={16} /> LinkedIn
                        </a>
                      )}
                      {/* {course.instructor.portfolio && (
                        <a href={course.instructor.portfolio} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:underline text-sm"
                        >
                          <FaGlobe size={16} /> Portfolio
                        </a>
                      )} */}
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Course Details Box */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-6 shadow-lg space-y-4">
            <h3 className="text-xl font-semibold mb-2">This Course Includes:</h3>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>📚 Lessons: <span className="text-white">{course.lessons}</span></li>
              <li>🧠 Level: <span className="text-white">{course.level}</span></li>
              <li>🎓 Certificate of Completion</li>
              <li>🌐 60+ hours of live Classes</li>
              <li>💰 100% Money-back Guarantee</li>
              <li>🤑 Affiliate Program Available</li>
              <li className="text-green-500">🎥 Live Classes</li>
            </ul>

            <div className="text-xl font-semibold">
              <span className="line-through text-neutral-500 mr-2">₹{course.price}</span>
              <span className="text-green-400">₹{course.discountedPrice}</span>
            </div>
            <p className="text-sm text-neutral-400">Batch of 30 only, so hurry up!</p>

            <a
                href={`https://wa.me/918543832619?text=${encodeURIComponent(`Hi, I am interested in the course: ${course.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-teal-800 hover:bg-teal-900 text-white px-6 py-2 rounded-md font-medium text-center"
                >
                Connect to Register
                </a>
          </div>
        </div>

        {/* LEFT MAIN CONTENT */}
        <div className="order-2 lg:order-1 lg:col-span-2 space-y-10">
          {course.whatYouWillLearn && (
            <div className="bg-neutral-900 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-3">What You Will Learn</h2>
              <ul className="list-disc list-inside text-neutral-300">
                {course.whatYouWillLearn.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {course.content && (
            <div className="bg-neutral-900 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-3">Course Content</h2>
              <div className="space-y-3">
                {course.content.map((sec, i) => (
                  <details key={i} className="bg-neutral-800 rounded-md px-4 py-3">
                    <summary className="font-medium text-lg cursor-pointer">{sec.title}</summary>
                    <ul className="list-disc list-inside text-neutral-400 mt-2 pl-4">
                      {sec.topics.map((t, j) => <li key={j}>{t}</li>)}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="bg-neutral-900 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
            <ul className="list-disc list-inside text-neutral-300 space-y-1">
              <li>Basic computer skills & internet access</li>
              <li>Willingness to learn and solve real-world problems</li>
              <li>Curiosity and consistency — that's all you need!</li>
              <li>Stable internet connection</li>
              <li>Basic familiarity with terminal/command line</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-neutral-900 p-6 rounded-xl mt-10">
            <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  How this course is different from others?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  All other courses comes with pre-recorded lectures which is non interactive and waste of money as most of things are available free in platforms like youtube etc. <br /> But this course will have live classes and will be more interactive, where you can ask any of your queries and get answers in real-time.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  Will I receive a certificate?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  Yes, a certificate of completion will be provided at the end of the course.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  What others benifits I will get?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  Along with course content, you will also get access to a community of learners, where you can network and collaborate with others. <br /> You will also get access to all the resources and materials shared during the course.
                  <br /> Also other than course we will have some sessions on resume building, interview preparation and mock interviews.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  What does it mean by 100% money-back guarantee?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  We offer a 100% money-back guarantee if you are not satisfied with the course content or delivery. You can claim for full fee refund any time before course completion.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  What is affiliate program and how it works?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  Yes, we do care about your time for sharing these courses with others so that they can also learn and grow. So to value your effort we offer 20% of the course fee as commission for each enrollement you make through your referral code. <br /> You can share your email id as your referral code and if they will use it while filling the registration form then you will get 20% of course fee on their course completion.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  Is this course beginner-friendly?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  Yes, this course is designed for beginners as well as those looking to brush up on fundamentals.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  Do we get community access to resolve our queries?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  Yes, other than live classes we will have disscussion forums and community of learners where you can ask your queries and get answers from other learners and instructors. <br /> You can also share your projects and get feedback from others.
                </p>
              </details>
              <details className="bg-neutral-800 rounded-md px-4 py-3">
                <summary className="font-medium text-lg cursor-pointer">
                  What will be the batch size?
                </summary>
                <p className="text-neutral-400 mt-2 pl-1">
                  To make it more interactive and to give you more time to ask your queries, we will have a batch size of 20-25 students only. <br /> This will help us to focus on each student and their queries. and will be like personal tutoring for each student.
                </p>
              </details>
            </div>
          </div>


          <Link to="/temp_courses" className="text-blue-400 hover:underline block">
            ← Back to Courses
          </Link>
        </div>
      </div>

      {/* Sticky Mobile Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 px-6 py-4 border-t border-neutral-700 lg:hidden z-50">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">₹{course.discountedPrice}</div>
          <a
                href={`https://wa.me/918543832619?text=${encodeURIComponent(`Hi, I am interested in the course: ${course.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-teal-800 hover:bg-teal-900 text-white px-6 py-2 rounded-md font-medium text-center"
                >
                Connect to Register
                </a>
        </div>
      </div>
      <br />
      <br/>
      <br/>
    </div>
  );
}


