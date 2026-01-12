import { Link } from "react-router";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // New X icon
import { MdEmail, MdLocationPin } from "react-icons/md";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-neutral py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <Logo />
          <p className="text-sm leading-relaxed mt-4 text-gray-200">
            A trusted platform connecting verified tutors with students. We help
            learners find qualified teachers effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-accent mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tuitions" className="hover:text-accent">
                Tuitions
              </Link>
            </li>
            <li>
              <Link to="/tutors" className="hover:text-accent">
                Tutors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold text-accent mb-3">
            Contact Info
          </h2>

          <p className="flex items-center gap-2 text-sm">
            <MdEmail /> support@etuitionbd.com
          </p>
          <p className="flex items-center gap-2 mt-2 text-sm">
            <MdLocationPin /> Dhaka, Bangladesh
          </p>

          {/* Social */}
          <div className="flex gap-4 text-2xl mt-4">
            <a className="hover:text-accent" href="#">
              <FaFacebook />
            </a>
            <a className="hover:text-accent" href="#">
              <FaXTwitter />
            </a>
            <a className="hover:text-accent" href="#">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-accent/30 mt-10" />

      <p className="text-center text-sm mt-6">
        © {new Date().getFullYear()} eTuitionBD — All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
