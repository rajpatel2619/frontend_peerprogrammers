import { HiOutlineMail} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/logo_black.png";

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-neutral-700/20 text-gray-700 dark:text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => Navigate("/")}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 transition-transform duration-300"
            />
            <span className="hidden md:inline font-medium text-xl dark:text-neutral-300 text-gray-900 select-none bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-lexend">
              Peer Programmers
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-funnel pt-5">
            Join our peer-learning community and accelerate your career.
          </p>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <HiOutlineMail className="text-blue-600" />
              <a
                href="mailto:peerprogrammers@gmail.com"
                className="hover:text-gray-400"
              >
                Send us a message
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-blue-600" />
              <Link
                target="_blank"
                to="https://whatsapp.com/channel/0029Vb5qezi47XeGL4ZY5W1s"
              >
                <span className="hover:text-gray-400">Join community</span>
              </Link>
            </li>
            {/* <li className="flex items-center gap-2">
              <HiOutlinePhone className="text-blue-600" />
              <span>+1 (234) 567-8901</span>
            </li> */}
          </ul>
        </div>

        {/* Popular Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-gray-400">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/training" className="hover:text-gray-400">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                Contact Us
              </Link>
            </li>
            {/* <li>
              <Link to="https://chat.whatsapp.com/JjllfudxuUnCAhGk754toQ
" className="hover:text-blue-600">WhatsApp community</Link>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Peer Programmers. All rights reserved.
        Made with ❤️
      </div>
    </footer>
  );
}
