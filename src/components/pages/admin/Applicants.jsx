import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicants, updateApplicant } from "./adminJobSlice";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Applicants = () => {
  const { getApplicantsDetails } = useSelector((state) => state.adminJob);
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(getApplicantsDetails);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (id) {
        try {
          const response = await dispatch(getApplicants(id)).unwrap();
          if (response.success) {
            toast.success("Applicants fetched successfully");
            console.log(response);
          }
        } catch (error) {
          toast.error("No applicants found");
        }
      }
    };

    fetchApplicants();
  }, [dispatch, id]);
  console.log(id);

  const handleStatus = async (value, applicantId) => {
    console.log("updating status");

    try {
      const response = await dispatch(
        updateApplicant({
          id: applicantId,
          status: value,
        })
      ).unwrap();

      if (response.success) {
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="flex flex-wrap flex-col gap-3 my-2 mx-8">
      {getApplicantsDetails?.applications?.length > 0 ? (
        getApplicantsDetails?.applications?.map((item) => {
          return (
            <div className="border-2 py-2 px-4 rounded-md border-[#d7e2e9] flex items-center gap-2 justify-between">
              <div className="flex gap-1 items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      item?.applicant.profile?.profilePhoto
                        ? item?.profile?.profilePhoto
                        : "https://github.com/shadcn.png"
                    }
                    alt="profile"
                  />
                </Avatar>
                <div className="font-bold text-[black]">
                  {item?.applicant.fullName}
                  <span className="font-semibold text-[#707070] mx-2">
                    {item?.applicant.email}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <a
                  className="no-underline text-[#3482ee]"
                  href={item?.applicant?.profile?.resume}
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a>
                <Select
                  onValueChange={(value) => handleStatus(value, item._id)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="accepted"
                      className="text-[#2ce22c] cursor-pointer"
                    >
                      Accepted
                    </SelectItem>
                    <SelectItem
                      value="rejected"
                      className="text-[#e2632c] cursor-pointer"
                    >
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })
      ) : (
        <div className="font-semibold text-xl text-current text-[#707070]">
          No Candidates has applied till now!
        </div>
      )}
    </div>
  );
};

export default Applicants;
