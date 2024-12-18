import React, { useState } from 'react';

const PasswordInput = ({ value, onChange, required }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <input
        type={isVisible ? 'text' : 'password'}
        className="mt-1 block w-full px-4 py-2 text-gray-100 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={value}
        onChange={onChange}
        required={required}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {isVisible ? (
          <span role="img" aria-label="Hide Password">🙈</span>
        ) : (
          <span role="img" aria-label="Show Password">👁️</span>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;