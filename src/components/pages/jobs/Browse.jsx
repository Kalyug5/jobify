import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "./jobSlice";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";

const Browse = () => {
  const { jobData } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("query");
  const [filteredJob, setFilteredJob] = useState([]);
  console.log(search);
  const [searchQuery, setQuery] = useState("");

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

  useEffect(() => {
    if (jobData.length > 0) {
      if (searchQuery?.length > 0) {
        setFilteredJob(
          jobData.filter((item) => {
            return (
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.companyId.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          })
        );
      } else if (search?.length > 0) {
        setFilteredJob(
          jobData.filter((item) => {
            return (
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.companyId.name.toLowerCase().includes(search.toLowerCase())
            );
          })
        );
      } else {
        setFilteredJob(jobData);
      }
    }
  }, [search, searchQuery]);
  return (
    <div className="max-w-7xl mx-auto my-10">
      <p className="font-semibold text-3xl">
        Explore All <span className="text-[#FF69B4]">The Trending jobs</span>
      </p>
      <div className="flex gap-4 items-center max-w-xl my-10">
        <Input
          placeholder="Search your job..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-72"
        />
        <h1 className="font-bold text-xl ">
          Search Results {filteredJob.length}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredJob.length > 0 ? (
          filteredJob.map((job) => {
            return <JobCard job={job} />;
          })
        ) : (
          <div className="text-center text-slate-400 text-xl">
            No Jobs Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
