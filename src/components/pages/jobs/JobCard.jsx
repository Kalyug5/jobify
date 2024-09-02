import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import React, { useEffect } from "react";
import google from "../../../../public/google.png";
import { Badge } from "@/components/ui/badge";
import { RiShareBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOneJob } from "./jobSlice";
import { toast } from "sonner";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-[#ccc]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job.companyId.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.companyId.name}</h1>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      </div>

      <div className="min-h-[120px]">
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job.position} Positions
        </Badge>
        <Badge className={"text-[#FA2A55] font-bold"} variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => navigate(`/job/detail/${job._id}`)}
        >
          Details <RiShareBoxFill />
        </Button>
        <Button className="bg-[#1f6eec]">Save</Button>
      </div>
    </div>
  );
};

export default JobCard;
