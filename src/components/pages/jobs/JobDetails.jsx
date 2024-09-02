import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob, getOneJob } from "./jobSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const JobDetails = () => {
  const dispatch = useDispatch();
  const { getOneJobData, applyJobLoadingData } = useSelector(
    (state) => state.job
  );
  const { getUserData } = useSelector((state) => state.user);

  console.log(getUserData);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(getOneJobData);
  console.log(id);

  const handleApply = async (id) => {
    console.log("applying");
    if (Object.keys(getUserData).length > 0) {
      try {
        console.log("applying2");
        const response = await dispatch(applyJob(id)).unwrap();
        console.log("applying4");
        if (response.success) {
          toast.success("Job Applied successfully! Wait for good Newz!");
        }
        fetchjob();
      } catch (error) {
        toast.error("Something went wrong in applied job");
      }
    }
    navigate("/login");
  };
  const fetchjob = async () => {
    console.log("loggin");

    try {
      console.log("logging");

      const response = await dispatch(getOneJob(id)).unwrap();
      console.log(response);
      if (response.success) {
        toast.success("Job Fetched Successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchjob();
  }, [dispatch]);

  const date = new Date(getOneJobData.createdAt);

  const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}-${date.getFullYear()}`;

  return (
    <div className="max-w-7xl mx-auto my-10 border rounded-md border-[#ccc] p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{getOneJobData.title}</h1>
          <p className="text-blue-500 font-semibold">
            {getOneJobData.companyId?.name}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {getOneJobData.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {getOneJobData.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {getOneJobData.salary} LPA
            </Badge>
            <Badge className={"text-[#5dc326] font-bold"} variant="ghost">
              {getOneJobData.location}
            </Badge>
            <Badge className={"text-[#ef4c8b] font-bold"} variant="ghost">
              {formattedDate}
            </Badge>
            {getOneJobData?.applications?.length > 0 ? (
              <Badge className={"text-[#ee5892] font-bold"} variant="ghost">
                {getOneJobData?.applications?.length} Applications
              </Badge>
            ) : null}
            <Badge className={"text-[#267fc3] font-bold"} variant="ghost">
              {getOneJobData?.experienceLevel}
            </Badge>{" "}
          </div>
        </div>

        {applyJobLoadingData ? (
          <Button className="w-auto my-4">
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying{" "}
          </Button>
        ) : (
          <Button
            className={`rounded-lg ${
              getOneJobData?.applications?.some(
                (item) => item.applicant === getUserData?._id
              )
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#1f6eec] hover:bg-[#1064eb]"
            }`}
            onClick={() => handleApply(getOneJobData?._id)}
          >
            {" "}
            {getOneJobData?.applications?.some(
              (item) => item.applicant === getUserData?._id
            )
              ? "Applied"
              : "Apply Now"}
          </Button>
        )}
      </div>
      <h1 className="border-b-2 border-b-gray-300 py-4 text-2xl font-bold">
        Job Summary
      </h1>
      <div className="my-4">
        <div>
          <h1 className="font-bold my-1 text-xl">Job Description</h1>
          <p className="text-gray-700 font-semibold">
            {getOneJobData?.description}
          </p>
        </div>
        <div>
          <h1 className="font-bold my-1 text-xl">Requirements</h1>
          {getOneJobData?.requirements?.length > 0
            ? getOneJobData?.requirements.map((item) => (
                <Badge className={"text-[#ee5892] font-bold"} variant="ghost">
                  {item}
                </Badge>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
