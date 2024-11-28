import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const About = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`relative min-h-screen min-w-full flex items-center justify-center bg-white text-[#283618] dark:bg-[#283618] dark:text-[#fefae0]`}
    >
      {/* Background Animation */}
      {/* <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-300 dark:from-black dark:to-black"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div> */}

      <div className="relative z-10 p-6 text-center">
        {/* Header Animation */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4caf50] to-[#8bc34a] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
            About Farmer's Assistant
          </h1>
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-lg mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <p className="text-lg leading-relaxed mb-6">
            Welcome to <strong>Farmer's Assistant</strong>, a one-stop solution
            designed to revolutionize modern farming practices. Our platform is
            dedicated to empowering farmers with the tools and resources they
            need to make informed decisions, enhance productivity, and embrace
            smart agricultural techniques.
          </p>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            At Farmer's Assistant, we aim to bridge the gap between technology
            and agriculture, offering farmers real-time support to address their
            daily challenges and foster sustainable growth in the agricultural
            sector.
          </p>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Crop Advisory:</strong> Get tailored crop recommendations
              based on soil type and environmental conditions.
            </li>
            <li>
              <strong>Fertilizer Guidance:</strong> Discover the best
              fertilizers for your crops to ensure healthy growth.
            </li>
            <li>
              <strong>Disease Management:</strong> Access a comprehensive
              database of crop diseases and suggested treatments.
            </li>
            <li>
              <strong>Pesticide Solutions:</strong> Find effective pesticides to
              combat crop diseases and pests.
            </li>
            <li>
              <strong>Manure Marketplace:</strong> Post and book manure, with
              easy notifications for sellers to accept or reject requests.
            </li>
            <li>
              <strong>Tractor Management:</strong> Seamlessly manage tractor
              availability for plowing and other tasks.
            </li>
            <li>
              <strong>Weather Updates:</strong> Stay updated with real-time
              weather forecasts to plan your farming activities.
            </li>
            <li>
              <strong>Market Insights:</strong> Get the latest market prices for
              crops to maximize your profits.
            </li>
            <li>
              <strong>Nursery Assistance:</strong> Explore plant nurseries to
              choose the best plants for your farm.
            </li>
            <li>
              <strong>Transportation Services:</strong> Simplify crop
              transportation with reliable service providers.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Why Choose Farmer's Assistant?
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>User-Friendly Interface:</strong> Intuitive design makes
              it easy for anyone to use.
            </li>
            <li>
              <strong>Real-Time Updates:</strong> Integrated APIs provide
              real-time market and weather data.
            </li>
            <li>
              <strong>Comprehensive Solutions:</strong> From crop selection to
              marketing, we've got it all covered.
            </li>
            <li>
              <strong>Sustainable Agriculture:</strong> Promote eco-friendly
              practices and maximize productivity.
            </li>
          </ul>
          <p className="text-lg leading-relaxed">
            Join us in transforming agriculture with innovation and technology.
            Let’s grow together! 🌾
          </p>
        </motion.p>

        {/* Button Animation */}
        <motion.a
          href="mailto:rohith018.r@gmail.com"
          className="inline-block px-6 py-3 bg-[#4caf50] text-white rounded-full shadow-lg hover:bg-[#8bc34a] transition duration-300 transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        >
          Contact Us
        </motion.a>
      </div>
    </div>
  );
};

export default About;
