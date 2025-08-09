import React, { useState } from "react";

const FAQs = () => {
  const faqData = [
    {
      category: "General Questions",
      items: [
        {
          q: "What is Peers Programmars?",
          a: "Peers Programmars is an educational platform that unite students, freshers, and working professionals to share their knowledge. And provides you best resources to boost your learning journey."
        },
        {
          q: "Who are the courses for?",
          a: "Our courses are designed for students, aspiring developers, working professionals, and anyone passionate about coding."
        },
        {
          q: "Are your batches beginner-friendly?",
          a: "Yes! We offer tracks for beginners, intermediate learners, and advanced developers."
        }
      ]
    },
    {
      category: "Courses & Curriculum",
      items: [
        {
          q: "What programming languages do you teach?",
          a: "We offer courses in C++, Java, Python, JavaScript, HTML, CSS, React, Node.js, MongoDB, SQL, and more."
        },
        {
          q: "Do your courses include real-world projects?",
          a: "Yes! Every batch includes hands-on projects, assignments, and a capstone project."
        },
        {
          q: "How long does each batch run?",
          a: "Batches typically run between 1.5 to 2 months, with fast-track options available."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      items: [
        {
          q: "Are the courses free or paid?",
          a: "Most premium batches are paid, but we offer free demo sessions and webinars."
        },
        {
          q: "What payment methods are accepted?",
          a: "We accept UPI, cards, net banking, and wallets. EMI options available."
        },
        {
          q: "Is there any refund policy?",
          a: "Yes. A 100% refund is offered within the first 15 days of the course start."
        }
      ]
    },
    {
      category: "Live Classes & Support",
      items: [
        {
          q: "Are the classes live or recorded?",
          a: "We provide live classes along with recorded sessions."
        },
        {
          q: "Will I get personal doubt support?",
          a: "Yes. 1:1 doubt clearing, mentor support, and active peer groups are provided."
        },
        {
          q: "What if I miss a class?",
          a: "All sessions are recorded and shared."
        }
      ]
    },
    {
      category: "Certificates & Placement Support",
      items: [
        {
          q: "Will I get a certificate after the course?",
          a: "Yes! You’ll receive a course completion and a project-based certificate."
        },
        {
          q: "Do you provide placement assistance?",
          a: "Yes. Resume building, mock interviews, company prep, and referrals are part of the package."
        }
      ]
    },
    {
      category: "How to Join",
      items: [
        {
          q: "How can I enroll in a batch?",
          a: "Enroll via our website or social media. After payment, access is granted within 24 hours."
        },
        {
          q: "Do you offer custom/group batches?",
          a: "Yes, we organize college-level batches, corporate training, and personal mentorship."
        }
      ]
    },
    {
      category: "Contact & Community",
      items: [
        {
          q: "How can I reach Peers Programmars?",
          a: "Email: peersprogrammars@gmail.com and Instagram/YouTube: @peerprogrammers."
        },
        {
          q: "Can I join the community without enrolling?",
          a: "Yes! Join our free community for tips, events, and peer interaction."
        }
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-700">Frequently Asked Questions (FAQs)</h1>
      {faqData.map((section, secIdx) => (
        <div key={secIdx} className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600 border-b pb-2">{section.category}</h2>
          <div className="space-y-4">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleFAQ(`${secIdx}-${idx}`)}
                className="cursor-pointer rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md bg-white"
              >
                <div className="px-6 py-4 flex justify-between items-center">
                  <p className="font-medium text-lg text-gray-900">{item.q}</p>
                  <span className="text-xl text-indigo-500">{openIndex === `${secIdx}-${idx}` ? "-" : "+"}</span>
                </div>
                {openIndex === `${secIdx}-${idx}` && (
                  <div className="px-6 pb-4 text-gray-700 border-t">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
