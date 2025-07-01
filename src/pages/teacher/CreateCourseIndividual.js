import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/TeacherSidebar";

export default function CreateCourseIndividual() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mode, setMode] = useState("live");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [domains, setDomains] = useState([]);
  const [domainOptions, setDomainOptions] = useState([]);
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [creatorIds, setCreatorIds] = useState([]);
  const [dailyMeetingLink, setDailyMeetingLink] = useState("");
  const [lectureLink, setLectureLink] = useState("");

  const [basicSeats, setBasicSeats] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [basicWhatsapp, setBasicWhatsapp] = useState("");
  const [premiumSeats, setPremiumSeats] = useState("");
  const [premiumPrice, setPremiumPrice] = useState("");
  const [premiumWhatsapp, setPremiumWhatsapp] = useState("");
  const [ultraSeats, setUltraSeats] = useState("");
  const [ultraPrice, setUltraPrice] = useState("");
  const [ultraWhatsapp, setUltraWhatsapp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/domains")
      .then((res) => res.json())
      .then((data) => setDomainOptions(data))
      .catch((err) => console.error("Error loading domains", err));
  }, []);

  const handleCreatorChange = (index, value) => {
    const updated = [...creatorIds];
    updated[index] = value;
    setCreatorIds(updated);
  };

  const addMoreCreator = () => setCreatorIds([...creatorIds, ""]);
  const removeCreator = (index) => {
    const updated = [...creatorIds];
    updated.splice(index, 1);
    setCreatorIds(updated);
  };

  const handleDomainSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setDomains(selected);
  };

  const handleSubmit = () => {
    const parsedCreatorIds = creatorIds.map((id) => parseInt(id));

    const courseDetails = {
      title,
      mode,
      start_date: startDate,
      end_date: endDate,
      domains,
      creator_ids: parsedCreatorIds,
      description,
      syllabusFile,
      coverPhoto,
      ...(mode === "recorded"
        ? { price, lecture_link: lectureLink }
        : {
            daily_meeting_link: dailyMeetingLink,
            basic_plan: { seats: basicSeats, price: basicPrice, whatsapp: basicWhatsapp },
            premium_plan: { seats: premiumSeats, price: premiumPrice, whatsapp: premiumWhatsapp },
            ultra_plan: { seats: ultraSeats, price: ultraPrice, whatsapp: ultraWhatsapp },
          }),
    };

    console.log("Course Submission Data:", courseDetails);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onNavigate={(path) => navigate(path)} />
      <div className="flex-1 p-10 w-full space-y-6 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold">Create New Course - For Individuals</h1>

        <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <div>
            <label className="block mb-1 font-medium">Course Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" placeholder="Enter course title" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mode</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700">
              <option value="live">Live</option>
              <option value="recorded">Recorded</option>
            </select>
          </div>

          {mode === "recorded" ? (
            <>
              <div>
                <label className="block mb-1 font-medium">Price (in ₹)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" placeholder="Enter course price" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Lecture Link</label>
                <input type="url" value={lectureLink} onChange={(e) => setLectureLink(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2 font-bold text-lg">Pricing Details</label>
                <div className="space-y-4 border rounded p-4 dark:border-gray-700">
                  <div>
                    <label className="block mb-1 font-medium">Basic Plan</label>
                    <div className="flex gap-4 mb-2">
                      <input type="number" value={basicSeats} onChange={(e) => setBasicSeats(e.target.value)} placeholder="Seats" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="number" value={basicPrice} onChange={(e) => setBasicPrice(e.target.value)} placeholder="Price per seat" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="url" value={basicWhatsapp} onChange={(e) => setBasicWhatsapp(e.target.value)} placeholder="WhatsApp Link" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Premium Plan</label>
                    <div className="flex gap-4 mb-2">
                      <input type="number" value={premiumSeats} onChange={(e) => setPremiumSeats(e.target.value)} placeholder="Seats" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="number" value={premiumPrice} onChange={(e) => setPremiumPrice(e.target.value)} placeholder="Price per seat" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="url" value={premiumWhatsapp} onChange={(e) => setPremiumWhatsapp(e.target.value)} placeholder="WhatsApp Link" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Ultra Premium Plan</label>
                    <div className="flex gap-4">
                      <input type="number" value={ultraSeats} onChange={(e) => setUltraSeats(e.target.value)} placeholder="Seats" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="number" value={ultraPrice} onChange={(e) => setUltraPrice(e.target.value)} placeholder="Price per seat" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                      <input type="url" value={ultraWhatsapp} onChange={(e) => setUltraWhatsapp(e.target.value)} placeholder="WhatsApp Link" className="w-1/3 px-4 py-2 rounded border dark:bg-gray-700" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Daily Meeting Link</label>
                <input type="url" value={dailyMeetingLink} onChange={(e) => setDailyMeetingLink(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
              </div>
            </>
          )}

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Domains</label>
            <select multiple value={domains} onChange={handleDomainSelect} className="w-full px-4 py-2 rounded border dark:bg-gray-700 h-32">
              {domainOptions.map((domain) => (
                <option key={domain.id} value={domain.id}>{domain.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Syllabus PDF</label>
            <input type="file" accept="application/pdf" onChange={(e) => setSyllabusFile(e.target.files[0])} className="w-full dark:bg-gray-700" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Cover Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} className="w-full dark:bg-gray-700" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Course Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Enter course description" className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Add Co-Mentors (User IDs)</label>
            {creatorIds.map((id, index) => (
              <div key={index} className="flex items-center mb-2 gap-2">
                <input type="text" value={id} onChange={(e) => handleCreatorChange(index, e.target.value)} placeholder={`Co-Mentor ${index + 1}`} className="w-full px-4 py-2 rounded border dark:bg-gray-700" />
                <button onClick={() => removeCreator(index)} className="text-red-500 hover:text-red-700 font-bold px-2 py-1">❌</button>
              </div>
            ))}
            <button onClick={addMoreCreator} className="text-blue-600 hover:underline text-sm mt-1">+ Add another</button>
          </div>

          <div className="flex justify-end mt-6">
            <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}