import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';

const AdminPage = ({ setIsAuthenticated, setIsAdmin }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editBio, setEditBio] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditPosition(user.position);
    setEditBio(user.bio);
    setShowModal(true); // Open the modal for editing
    setIsDelete(false); // Ensure the modal is for editing, not deleting
  };

  const handleDeleteUser = (email) => {
    setUserToDelete(email);
    setShowModal(true); 
    setIsDelete(true); 
  };

  const handleSaveUser = () => {
    const updatedUsers = users.map((user) =>
      user.email === editingUser.email ? { ...user, name: editName, position: editPosition, bio: editBio } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    setShowModal(false); 
    alert('User updated successfully');
  };

  const handleConfirmDelete = () => {
    const updatedUsers = users.filter((user) => user.email !== userToDelete);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowModal(false); 
    alert('User deleted successfully');
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-900 min-h-screen text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 w-full">
        <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">Admin Management</h2>
        <button
          onClick={handleLogout}
          className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <FaTimes size={24} />
            </button>

            {isDelete ? (
              <>
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Confirm Deletion</h3>
                <p className="text-gray-200 mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={handleConfirmDelete}
                    className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 w-full"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300 w-full"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Edit User</h3>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                  className="w-full p-4 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <input
                  type="text"
                  value={editPosition}
                  onChange={(e) => setEditPosition(e.target.value)}
                  placeholder="Position"
                  className="w-full p-4 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Bio"
                  className="w-full p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400"
                ></textarea>
                <button
                  onClick={handleSaveUser}
                  className="w-full py-3 mt-6 bg-green-500 text-gray-900 font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-full mt-8">
        <table className="w-full bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-yellow-400 text-left">
              <th className="p-4 text-base">Name</th>
              <th className="p-4 text-base">Email</th>
              <th className="p-4 text-base">Position</th>
              <th className="p-4 text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.email} className="border-t border-gray-700">
                <td className="p-4 text-base">{user.name}</td>
                <td className="p-4 text-base">{user.email}</td>
                <td className="p-4 text-base">{user.position}</td>
                <td className="p-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-2"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 float-right">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white ms-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
