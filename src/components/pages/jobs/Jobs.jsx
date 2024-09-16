import React, { useEffect } from "react";
import FilterJobs from "./FilterJobs";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getJob } from "./jobSlice";

const Jobs = () => {
  const { jobData, filteredData } = useSelector((state) => state.job);
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
    <>
      <div className="mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/6">
            <FilterJobs />
          </div>
          {filteredData.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((job) => (
                  <JobCard job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
