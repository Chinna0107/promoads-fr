// router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/sections/Hero';
import AboutPage from './components/sections/AboutPage';
import Events from './components/sections/Events';
import LoginPage from './components/sections/Login';
import ForgotPassword from './components/sections/ForgotPassword';
import Home from './components/sections/Home';
import AdminHome from './components/sections/AdminHome';
import Profile from './components/sections/Profile';
import Dashboard from './components/user/Dashboard';
import AdminDashboard from './components/user/AdminDashboard';
import Playground from './components/games/Playground';
import EventQuotation from './components/sections/IndividualRegistration';
import Schedule from './components/sections/Schedules';
import Coordinators from './components/sections/Coordinators';
import Location from './components/sections/Location';
import Contact from './components/sections/Contact';
// import CoordinatorsLogin from './components/sections/CoordinatorLogin';
import AdminWinnersData from './components/user/AdminWinnersData';
import UserEvents from './components/user/UserEvents';
import TestPage from './components/sections/TestPage';
import Gallery from './components/sections/Gallery';
import VerifyPage from './components/sections/VerifyPage';
import EventsShowcase from './pages/EventsShowcase';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin-home" element={<AdminHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-events" element={<UserEvents />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/user/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboardWrapper />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/quotation" element={<EventQuotation />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path='/team' element={<Coordinators />} />
      <Route path="/location" element={<Location />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/coordinator-login" element={<CoordinatorsLogin />} /> */}
      <Route path="/admin/winners" element={<AdminWinnersData />} />
      <Route path="/admin/winners/:eventName" element={<AdminWinnersData />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/eventsshowcase" element={<EventsShowcase />} />
      <Route path='*' element={<Hero />} />
    </Routes>
  </BrowserRouter>
);

function AdminDashboardWrapper() {
  return <AdminDashboard />;
}

export default Router;
