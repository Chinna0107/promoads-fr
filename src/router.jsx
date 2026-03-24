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
import ParticipantEvents from './components/user/ParticipantEvents';
import Playground from './components/games/Playground';
import RegistrationChoices from './components/sections/RegistrationChoices';
import IndividualRegistration from './components/sections/IndividualRegistration';
import TeamRegistration from './components/sections/TeamRegistration';
import Schedule from './components/sections/Schedules';
import Coordinators from './components/sections/Coordinators';
import Location from './components/sections/Location';
import Contact from './components/sections/Contact';
import CoordinatorsLogin from './components/sections/CoordinatorLogin';
import CoordinatorDashboard from './components/user/CoordinatorDashboard';
import CoordinatorMenu from './components/user/CoordinatorMenu';
import CoordinatorProfile from './components/user/CoordinatorProfile';
import CoordinatorEvents from './components/user/CoordinatorEvents';
import EventDetails from './components/user/EventDetails';
import TakeAttendance from './components/user/TakeAttendance';
import ViewAttendance from './components/user/ViewAttendance';
import CoordinatorSchedule from './components/user/CoordinatorSchedule';
import CoordinatorCertifications from './components/user/CoordinatorCertifications';
import Evaluation from './components/user/Evaluation';
import MarkEvaluation from './components/user/MarkEvaluation';
import ViewEvaluation from './components/user/ViewEvaluation';
import RegisteredData from './components/user/RegisteredData';
import WinnersData from './components/user/WinnersData';
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
      <Route path="/register" element={<RegistrationChoices />} />
      <Route path="/register/:eventId" element={<RegistrationChoices />} />
      <Route path="/individual-registration" element={<IndividualRegistration />} />
      <Route path="/team-registration" element={<TeamRegistration />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path='/team' element={<Coordinators />} />
      <Route path="/location" element={<Location />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/coordinator-login" element={<CoordinatorsLogin />} />
      <Route path="/coordinator/menu" element={<CoordinatorMenu />} />
      <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
      <Route path="/coordinator/profile" element={<CoordinatorProfile />} />
      <Route path="/coordinator/events" element={<CoordinatorEvents />} />
      <Route path="/coordinator/event-details/:eventName" element={<EventDetails />} />
      <Route path="/coordinator/schedules" element={<CoordinatorSchedule />} />
      <Route path="/coordinator/certifications" element={<CoordinatorCertifications />} />
      <Route path="/coordinator/take-attendance/:eventName" element={<TakeAttendance />} />
      <Route path="/coordinator/view-attendance/:eventName" element={<ViewAttendance />} />
      <Route path="/coordinator/evaluation/:eventName" element={<Evaluation />} />
      <Route path="/coordinator/mark-evaluation/:eventName" element={<MarkEvaluation />} />
      <Route path="/coordinator/mark-evaluation/:eventName/:participantName" element={<MarkEvaluation />} />
      <Route path="/coordinator/view-evaluation/:eventName" element={<ViewEvaluation />} />
      <Route path="/coordinator/registered-data/:eventName" element={<RegisteredData />} />
      <Route path="/coordinator/winners" element={<WinnersData />} />
      <Route path="/coordinator/winners/:eventName" element={<WinnersData />} />
      <Route path="/admin/winners" element={<AdminWinnersData />} />
      <Route path="/admin/winners/:eventName" element={<AdminWinnersData />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/events-showcase" element={<EventsShowcase />} />
      <Route path='*' element={<Hero />} />
    </Routes>
  </BrowserRouter>
);

function AdminDashboardWrapper() {
  return <AdminDashboard />;
}

export default Router;
