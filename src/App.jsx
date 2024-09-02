import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import NavBar from "./components/stories/NavBar";
import Home from "./Home/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Jobs from "./components/pages/jobs/Jobs";
import Browse from "./components/pages/jobs/Browse";
import Profile from "./components/pages/profile/Profile";
import JobDetails from "./components/pages/jobs/JobDetails";
import Companies from "./components/pages/admin/Companies";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route path="/" index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/job/detail/:id" element={<JobDetails />} />
            <Route path="/recruiter/companies" element={<Companies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

const LayOut = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
