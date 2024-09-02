import { Badge } from "@/components/ui/badge";
import { GrShare } from "react-icons/gr";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplyJobs } from "../jobs/jobSlice";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const AppliedJobs = () => {
  const { appliedJobData, appliedJobLoadingData } = useSelector(
    (state) => state.job
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(appliedJobData);

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        const response = await dispatch(getApplyJobs()).unwrap();
        if (response.success) {
          toast.success("Here is you applied jobs");
        }
      } catch (error) {
        toast.error("Error fetching applied jobs");
      }
    };

    fetchAppliedJob();
  }, [dispatch]);

  const formattedDate = (item) => {
    const date = new Date(item);

    return `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-wrap flex-col gap-3 my-2">
      {Object.keys(appliedJobData).length > 0 ? (
        appliedJobData.map((item, index) => {
          return (
            <div className="border-2 py-2 px-4 rounded-md border-[#d7e2e9] flex items-center gap-2 justify-between">
              <div className="flex gap-1 items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      item?.jobId?.companyId?.logo
                        ? item?.jobId.companyId?.logo
                        : "https://github.com/shadcn.png"
                    }
                    alt="profile"
                  />
                </Avatar>
                <div className="font-bold text-[#707070]">
                  {item?.jobId?.companyId?.name} ,
                  <span className="font-semibold mx-2">
                    {item?.jobId?.title}
                  </span>
                </div>
              </div>
              <div>{formattedDate(item.createdAt)}</div>
              <div>
                <Badge
                  className={`${
                    item?.status === "rejected"
                      ? "bg-red-400"
                      : item?.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-green-400"
                  }`}
                >
                  {item?.status.toUpperCase()}
                </Badge>
              </div>

              <div>
                <GrShare
                  className="font-extrabold text-[#2b4df3] cursor-pointer"
                  onClick={() => navigate(`/job/detail/${item?.jobId?._id}`)}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div>You Haven't Applied any jobs till now!</div>
      )}
    </div>
  );
};

export default AppliedJobs;
