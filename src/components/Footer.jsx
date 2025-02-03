const Footer = () => {
  return (
    <footer className="bg-smokeWhite p-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-center">
        {/* About Us */}
        <div className="mb-4 w-full md:w-1/3">
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="text-sm">
            We are dedicated to providing quality services and ensuring customer
            satisfaction. Learn more about our mission and values on our About
            Us page.
          </p>
        </div>

        {/* Contact Us Section */}
        <div className="mb-4 w-full md:w-1/3">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p className="text-sm">Have questions? Reach out to us!</p>
          <p className="text-sm">
            Email:{" "}
            <a href="mailto:example@example.com" className="text-blue-500">
              aakritmaharjan01@gmail.com
            </a>
          </p>
          <p className="text-sm">
            Phone:{" "}
            <a href="tel:+9779849444046" className="text-blue-500">
              +977 9849444046
            </a>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="mb-4 w-full md:w-1/3">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <p>
            <a
              href="https://www.instagram.com/maharjanaakrit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mx-2"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mx-2"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mx-2"
            >
              Twitter
            </a>
          </p>
        </div>
      </div>

      {/* Footer Credits */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>&copy; {new Date().getFullYear()} Aggregatge Shoes Portal.</p>
      </div>
    </footer>
  );
};

export default Footer;
