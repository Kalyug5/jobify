import React, { useEffect } from "react";
import LatestJobsCard from "./LatestJobsCard";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "@/components/pages/jobs/jobSlice";
import { toast } from "sonner";
import JobCard from "@/components/pages/jobs/JobCard";

const LatestJobs = () => {
  const { jobData } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await dispatch(getJob()).unwrap();
        if (response?.message.length > 0) {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error("Something went wrong in fetching jobs");
      }
    };
    fetchJobs();
  }, [dispatch]);

  console.log(jobData);

  return (
    <>
      <div className="max-w-7xl mx-auto my-20 md:mx-10 lg:mx-auto">
        <h1 className="text-4xl font-bold">
          <span className="text-[#008080]">Explore the latest </span> Job
          Openings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {jobData.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            jobData
              ?.slice(0, 6)
              .map((job) => <JobCard key={job._id} job={job} />)
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
