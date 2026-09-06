import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import Colleges from './pages/Colleges/Colleges.jsx';
import CollegeDetails from './pages/CollegeDetails/CollegeDetails.jsx';
import Rankings from './pages/Rankings/Rankings.jsx';
import FindMyCollege from './pages/FindMyCollege/FindMyCollege.jsx';
import Compare from './pages/Compare/Compare.jsx';
import Shortlist from './pages/Shortlist/Shortlist.jsx';
import Roadmap from './pages/Roadmap/Roadmap.jsx';
import Scholarships from './pages/Scholarships/Scholarships.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Login from './pages/Login/Login.jsx';
import Payment from './pages/Payment/Payment.jsx';
import Premium from './pages/Premium/Premium.jsx';
import Exams from './pages/Exams/Exams.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />

        {/* Colleges Search */}
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/colleges.html" element={<Colleges />} />

        {/* College Details */}
        <Route path="/college" element={<CollegeDetails />} />
        <Route path="/college.html" element={<CollegeDetails />} />

        {/* NIRF Rankings */}
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/rankings.html" element={<Rankings />} />

        {/* Find My College */}
        <Route path="/find" element={<FindMyCollege />} />
        <Route path="/find.html" element={<FindMyCollege />} />

        {/* Compare */}
        <Route path="/compare" element={<Compare />} />
        <Route path="/compare.html" element={<Compare />} />

        {/* Shortlist */}
        <Route path="/shortlist" element={<Shortlist />} />
        <Route path="/shortlist.html" element={<Shortlist />} />

        {/* Admission Roadmap */}
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/roadmap.html" element={<Roadmap />} />

        {/* Scholarships */}
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/scholarships.html" element={<Scholarships />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard.html" element={<Dashboard />} />

        {/* Login / Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/login.html" element={<Login />} />

        {/* Payment */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment.html" element={<Payment />} />

        {/* Premium */}
        <Route path="/premium" element={<Premium />} />
        <Route path="/premium.html" element={<Premium />} />

        {/* Entrance Exams */}
        <Route path="/exams" element={<Exams />} />
        <Route path="/exams.html" element={<Exams />} />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
