import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "@/components/stories/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { getUserData } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      Object.keys(getUserData).length > 0 &&
      getUserData?.role === "recruiter"
    ) {
      navigate("/recruiter/companies");
    } else if (Object.keys(getUserData).length === 0) {
      navigate("/");
    }
  }, [getUserData, navigate]);
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  );
};

export default Home;
