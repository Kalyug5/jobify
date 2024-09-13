import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, getCompanyJob } from "./adminSlice";
import { toast } from "sonner";
import { GrShare } from "react-icons/gr";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { GrAdd } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import CreateCompany from "./CreateCompany";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import EditCompany from "./EditCompany";

const Companies = () => {
  const [jobCount, setjobCount] = useState({});
  const [open, setOpen] = useState(false);
  const {
    getCompanyDetails,
    getCompanyDetailsLoading,
    getCompanyDetailsError,
  } = useSelector((state) => state.admin);
  const [editCompany, seteditCompany] = useState({
    company: {},
    active: false,
  });

  const dispatch = useDispatch();

  const editHandler = (company) => {
    seteditCompany((prev) => {
      return { company: company, active: !prev.active };
    });
  };
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await dispatch(getCompanies()).unwrap();
        if (response.success) {
          toast.success("Companies fetched successfully");
          console.log(response);
        }
      } catch (error) {
        toast.error(
          getCompanyDetailsLoading
            ? getCompanyDetailsLoading
            : "Something went wrong"
        );
      }
    };

    fetchCompanies();
  }, [dispatch]);

  useEffect(() => {
    const loadJobs = async () => {
      const counts = {};
      for (const item of getCompanyDetails) {
        try {
          const count = await fetchSpecificJobs(item._id);

          counts[item._id] = count;
        } catch (error) {
          counts[item._id] = 0;
        }
      }
      setjobCount(counts);
    };
    if (getCompanyDetails.length > 0) {
      loadJobs();
    }
  }, [getCompanyDetails]);

  const fetchSpecificJobs = async (id) => {
    const response = await dispatch(getCompanyJob(id)).unwrap(id);

    if (response.success) {
      return response.jobs.length;
    }
    return 0;
  };
  return (
    <>
      <div className="flex justify-end p-2 mx-auto max-w-7xl">
        <Button
          className="text-[#2687e7] flex gap-2 outline-[#2687e7]"
          variant="outline"
          onClick={() => setOpen(!open)}
        >
          <GrAdd /> Add Company
        </Button>
      </div>
      <div className="max-w-7xl p-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        {getCompanyDetails.length > 0 ? (
          getCompanyDetails?.map((item, index) => {
            return (
              <div className="border flex flex-col gap-4 border-[#ccc] p-3 rounded-md h-full shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex justify-start items-center gap-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item?.logo} />
                    </Avatar>
                    <span className="font-bold text-xl">{item.name}</span>
                  </div>
                  <a
                    target="blank"
                    href={item?.website}
                    className="text-blue-500 hover:no-underline cursor-pointer"
                  >
                    <GrShare />
                  </a>
                </div>
                <div className="mt-2 text-[#707070] h-56">
                  {item.description}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    No of Jobs Opening{" "}
                    <span className="text-[#2687e7] font-bold text-s">
                      {jobCount[item._id]}
                    </span>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => editHandler(item)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            );
          })
        ) : (
          <span>No companies</span>
        )}
      </div>
      <CreateCompany open={open} setOpen={setOpen} />
      <EditCompany editCompany={editCompany} seteditCompany={seteditCompany} />
    </>
  );
};

export default Companies;
