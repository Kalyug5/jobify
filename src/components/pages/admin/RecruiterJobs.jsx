import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { getAdminJobs } from "./adminJobSlice";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { RiShareBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import CreateJob from "./CreateJob";

const RecruiterJobs = () => {
  const { getAdminJobsDetails, getAdminJobsLoading } = useSelector(
    (state) => state.adminJob
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await dispatch(getAdminJobs()).unwrap();
        if (response) {
          toast.success("Jobs Fetched successfully!");
        }
      } catch (error) {
        toast.error("Went Wrong");
      }
    };

    fetchJobs();
  }, [dispatch]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (getAdminJobsDetails.length > 0) {
      if (query.length > 0) {
        setFilteredData(
          getAdminJobsDetails.filter(
            (job) =>
              job.title.toLowerCase().includes(query.toLowerCase()) ||
              job.companyId.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else {
        setFilteredData(getAdminJobsDetails);
      }
    }
  }, [query, getAdminJobsDetails]);

  return (
    <div>
      <div className="flex justify-between items-center p-2 mx-auto max-w-7xl">
        <Input
          type="text"
          className="border-gray-400 border outline-none w-60"
          placeholder="Search Jobs..."
          name="search"
          onChange={handleSearch}
          value={query}
        />

        <Button
          className="text-[#2687e7] flex gap-2 outline-[#2687e7]"
          variant="outline"
          onClick={() => setOpen(!open)}
        >
          <GrAdd /> Create Job
        </Button>
      </div>
      <div className="max-w-7xl p-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="border flex flex-col gap-4 border-[#ccc] p-3 rounded-md h-full shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-500">{item.companyId.name}</p>
                <Button variant="outline" className="rounded-full" size="icon">
                  <Bookmark />
                </Button>
              </div>
              <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                  <Avatar>
                    <AvatarImage src={item.companyId.logo} />
                  </Avatar>
                </Button>
                <div>
                  <h1 className="font-medium text-lg">{item.title}</h1>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
              <div className="min-h-[120px]">
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => navigate(`/applicants/${item._id}`)}
                >
                  applicants <RiShareBoxFill />
                </Button>
                <Button className="bg-transparent border-[red] border text-[#fe4c2c] hover:bg-transparent">
                  remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="font-bold text-2xl text-[blue]">
            No Jobs Found, Create One
          </div>
        )}
      </div>
      <CreateJob open={open} setOpen={setOpen} />
    </div>
  );
};

export default RecruiterJobs;
