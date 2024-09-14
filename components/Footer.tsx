import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <FaEnvelope className="inline-block mr-2" /> Contact Us
      </h2>
      <p className="text-lg mb-6 text-center">
        If you are a school administrator interested in our services, please
        contact us at{" "}
        <a
          href="mailto:omkarchebale0@gmail.com"
          className="text-blue-500 hover:text-blue-700"
        >
          info@disciplinex.com
        </a>
        . We look forward to helping you foster a disciplined and productive
        learning environment.
      </p>
    </div>
  );
};

export default Footer;
