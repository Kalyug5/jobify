import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "./jobSlice";
import { toast } from "sonner";

const Browse = () => {
  const { jobData } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getJob()).unwrap();
        if (response?.message.length > 0) {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error("Something went wrong in fetching jobs");
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <p className="font-semibold text-3xl">
        Explore All <span className="text-[#FF69B4]">The Trending jobs</span>
      </p>
      <h1 className="font-bold text-xl my-10">
        Search Results {jobData.length}
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {jobData.map((job) => {
          return <JobCard job={job} />;
        })}
      </div>
    </div>
  );
};

export default Browse;
