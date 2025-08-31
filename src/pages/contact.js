import Navbar from "../components/Navbar";
import FAQs from "../components/home/FAQs";
import Contact from "../components/Contact";

const ContactPage = () => { // Note: Capitalized component name
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Contact/>
      <FAQs/>
      
    </div>
  );
};

export default ContactPage; // Note: Capitalized component name