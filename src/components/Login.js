import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const demoAccount = {
    email: "alice@example.com",
    password: "alice123"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const adminEmail = 'rahul773@gmail.com';
    const adminPassword = 'rahul773';

    if (email === adminEmail && password === adminPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      setLoading(false);
      navigate('/admin');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.email === email && user.password === password);

    if (currentUser) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setLoading(false);
      navigate('/account');
    } else {
      setErrorMessage('Invalid email or password');
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 sm:p-8">
      {/* Login Form */}
      <form
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg space-y-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-4">Login</h2>

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register New Account
          </Link>
        </p>
      </form>

      {/* Button to open the Modal */}
      <button
        onClick={toggleModal}
        className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Quick Access Info
      </button>

      {/* Modal for Quick Access Information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-indigo-600 text-lg font-semibold mb-2">Quick Access</h3>
            <p className="mb-2">Use the following credentials:</p>
            <div className="mb-4">
              <p className="font-semibold">Admin Account:</p>
              <p>Email: <span className="text-indigo-500">rahul773@gmail.com</span></p>
              <p>Password: <span className="text-indigo-500">rahul773</span></p>
              <p className="text-sm text-gray-500 mt-1">Admin can edit or delete user accounts.</p>
            </div>
            <div>
              <p className="font-semibold">Demo Account:</p>
              <p>Email: <span className="text-indigo-500">{demoAccount.email}</span></p>
              <p>Password: <span className="text-indigo-500">{demoAccount.password}</span></p>
            </div>

            {/* Button to close the modal */}
            <button
              onClick={toggleModal}
              className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
