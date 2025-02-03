import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    firstname: "",
    password: "",
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login);
    setLogin({
      firstname: "",
      password: "",
    });
  };

  return (
    <>
      <div className="">
        <div className="min-h-screen bg-gray-100 relative flex items-center justify-center">
          {/* Absolute positioned header */}
          <h1 className="absolute top-4 left-4 text-3xl font-bold text-gray-800">
            Aggregate Shoes Portal
          </h1>

          {/* Login form takes up half the page */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-1/2"
          >
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="firstname"
                placeholder="Enter your email"
                value={login.firstname}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={login.password}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 text-center">
              <p className="hover:text-blue-500 hover:underline cursor-pointer">
                <Link to="/signup">Create a new account </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
