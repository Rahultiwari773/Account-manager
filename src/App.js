import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AccountManagement from './components/AccountManagement';
import AdminPage from './components/AdminPage';

const demoUsers = [
  { name: "Alice Johnson", email: "alice@example.com", password: "alice123", position: "Software Engineer", bio: "Loves coding.", profilePicture: "https://randomuser.me/api/portraits/women/1.jpg", coverPhoto: "https://picsum.photos/800/200?random=1", dob: "1990-05-15" },
  { name: "Bob Smith", email: "bob@example.com", password: "bob123", position: "Product Manager", bio: "Building products.", profilePicture: "https://randomuser.me/api/portraits/men/2.jpg", coverPhoto: "https://picsum.photos/800/200?random=2", dob: "1988-03-22" },
  { name: "Cathy Brown", email: "cathy@example.com", password: "cathy123", position: "UX Designer", bio: "User-friendly designs.", profilePicture: "https://randomuser.me/api/portraits/women/3.jpg", coverPhoto: "https://picsum.photos/800/200?random=3", dob: "1992-07-08" },
  { name: "David Lee", email: "david@example.com", password: "david123", position: "Data Scientist", bio: "Loves data.", profilePicture: "https://randomuser.me/api/portraits/men/4.jpg", coverPhoto: "https://picsum.photos/800/200?random=4", dob: "1985-12-04" },
  { name: "Eva Green", email: "eva@example.com", password: "eva123", position: "Backend Developer", bio: "Server-side apps.", profilePicture: "https://randomuser.me/api/portraits/women/5.jpg", coverPhoto: "https://picsum.photos/800/200?random=5", dob: "1991-10-20" },
  { name: "Frank Wright", email: "frank@example.com", password: "frank123", position: "DevOps Engineer", bio: "CI/CD expert.", profilePicture: "https://randomuser.me/api/portraits/men/6.jpg", coverPhoto: "https://picsum.photos/800/200?random=6", dob: "1987-09-30" },
  { name: "Grace Hill", email: "grace@example.com", password: "grace123", position: "Frontend Developer", bio: "Responsive UIs.", profilePicture: "https://randomuser.me/api/portraits/women/7.jpg", coverPhoto: "https://picsum.photos/800/200?random=7", dob: "1994-06-25" },
  { name: "Henry Adams", email: "henry@example.com", password: "henry123", position: "QA Engineer", bio: "Software quality.", profilePicture: "https://randomuser.me/api/portraits/men/8.jpg", coverPhoto: "https://picsum.photos/800/200?random=8", dob: "1986-11-12" },
  { name: "Ivy Martinez", email: "ivy@example.com", password: "ivy123", position: "Content Writer", bio: "Engaging content.", profilePicture: "https://randomuser.me/api/portraits/women/9.jpg", coverPhoto: "https://picsum.photos/800/200?random=9", dob: "1993-08-19" },
  { name: "Jack Wilson", email: "jack@example.com", password: "jack123", position: "Mobile Developer", bio: "iOS/Android apps.", profilePicture: "https://randomuser.me/api/portraits/men/10.jpg", coverPhoto: "https://picsum.photos/800/200?random=10", dob: "1990-01-17" }
];

const initializeDemoUsers = () => {
  // Only add demo users if 'users' does not exist in localStorage
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    initializeDemoUsers();
    const loggedInUser = localStorage.getItem("isAuthenticated");
    const adminStatus = localStorage.getItem("isAdmin");

    if (loggedInUser) setIsAuthenticated(true);
    if (adminStatus === 'true') setIsAdmin(true);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/account" />} />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
        <Route path="/account" element={isAuthenticated ? <AccountManagement setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <AdminPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
