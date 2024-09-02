import { Badge } from "@/components/ui/badge";
import React from "react";

const LatestJobsCard = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-sm bg-white border border-[#ccc]-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veniam
          odit quo obcaecati vel laudantium quos.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          10 position
        </Badge>
        <Badge className={"text-[#008080] font-bold"} variant="ghost">
          full time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          12 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
