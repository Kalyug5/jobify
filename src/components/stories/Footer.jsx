import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex  md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Jobify</h2>
            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="hover:text-[#FA2A55]"
              aria-label="Facebook"
            >
              <FaInstagram className="text-xl text-[#FF69B4]" />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-blue"
              aria-label="Twitter"
            >
              <FaLinkedinIn className="text-xl text-[#2a2af1]" />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <LuGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
